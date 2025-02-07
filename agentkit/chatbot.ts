import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import fs from "fs";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillionOrgConfig";
import {
  DecreaseStockTool,
  DefaultGraphQueryTool,
  GraphStockAggregationQueryTool,
  GraphSupplierLeadTimeQueryTool,
  RestockItemTool,
} from "./tools";

dotenv.config({ path: "../.env" });

/**
 * Validate required environment variables
 */
function validateEnvironment() {
  const requiredVars = [
    "OPENAI_API_KEY",
    "CDP_API_KEY_NAME",
    "CDP_API_KEY_PRIVATE_KEY",
    "BASE_RPC_URL",
    "PRIVATE_KEY",
    "CONTRACT_ADDRESS",
    "NETWORK_ID",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(
      "Error: Missing required environment variables:",
      missingVars.join(", ")
    );
    process.exit(1);
  }
}

validateEnvironment();

// Nillion Schema IDs
const API_KEY_SCHEMA_ID: string = "3c810f05-74b9-4c4d-846d-081c1045564e";
//@ts-ignore
const collection = new SecretVaultWrapper(
  orgConfig.nodes,
  orgConfig.orgCredentials,
  API_KEY_SCHEMA_ID
);
await collection.init();
// Write to Nillion
// const data = [
//   {
//     CDP_API_KEY_NAME: { $allot: process.env.CDP_API_KEY_NAME },
//     CDP_API_KEY_PRIVATE_KEY: { $allot: process.env.CDP_API_KEY_PRIVATE_KEY },
//     OPENAI_API_KEY: { $allot: process.env.OPENAI_API_KEY },
//     CONTRACT_ADDRESS: { $allot: process.env.CONTRACT_ADDRESS }
//   }
// ];
// const dataWritten = await collection.writeToNodes(data);

const decryptedCollectionData = await collection.readFromNodes({});
const {
  _id,
  CDP_API_KEY_NAME,
  CDP_API_KEY_PRIVATE_KEY,
  OPENAI_API_KEY,
  CONTRACT_ADDRESS,
} = decryptedCollectionData[1];

// Store agent wallet data
const WALLET_DATA_FILE = "wallet_data.txt";

const restockItemTool = new RestockItemTool(CONTRACT_ADDRESS);
const decreaseStockTool = new DecreaseStockTool(CONTRACT_ADDRESS);
const graphStockAggregationQueryTool = new GraphStockAggregationQueryTool();
const graphSupplierLeadTimeQueryTool = new GraphSupplierLeadTimeQueryTool();
const defaultGraphQueryTool = new DefaultGraphQueryTool();

/**
 * Initialize the CDP AgentKit
 */
async function initializeAgent() {
  try {
    const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

    let walletDataStr = fs.existsSync(WALLET_DATA_FILE)
      ? fs.readFileSync(WALLET_DATA_FILE, "utf8")
      : null;

    const config = {
      cdpWalletData: walletDataStr || undefined,
      networkId: process.env.NETWORK_ID || "base-sepolia",
    };

    const agentkit = await CdpAgentkit.configureWithWallet(config);

    const cdpToolkit = new CdpToolkit(agentkit);
    const tools = cdpToolkit.getTools();

    tools.push(restockItemTool);
    tools.push(decreaseStockTool);
    tools.push(graphStockAggregationQueryTool);
    tools.push(graphSupplierLeadTimeQueryTool);
    tools.push(defaultGraphQueryTool);

    const memory = new MemorySaver();
    const agentConfig = { configurable: { thread_id: "CDP Inventory Bot" } };

    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
    You are an AI-powered inventory assistant that helps manage restocking decisions using on-chain data and supplier information. 
    Users will interact with you in a chat-like manner, often describing actions like "consume," "use," or "sell" that decrease inventory levels. 
    You are to decrease the inventory level using the **DecrementStockTool** provided to you.

    After decreasing inventory levels, you must **always run a check to decide if restocking is needed**. 
    Restocking decisions and actions must follow the instructions below:

    ### **Important Reminders**  
    - **Always use the provided tools**: Any stock-level changes must be updated on the blockchain using the provided tools (e.g., **RestockItemTool**). Do not update stock levels in memory without updating the contract.
    - **Explain your rationale**: Whenever you decide to restock, explain the reasoning behind your decision and provide insights into why restocking is needed.

      ### **Your Process for Restocking**
      1️⃣ **Monitor Stock Usage**  
         - Use the **GraphStockAggregationQueryTool** to check the most recent stock decrease for an item.  
    
      2️⃣ **Check Current Stock Levels**  
         - Use the contract to check **current stock quantity** and **threshold** or the items list using the **Graph Query Tool**.
        - Threshold information can be found in the itemsAdded list using the **Graph Query Tool**.

      3️⃣ **Evaluate Restocking Need**  
        - You must use BOTH **recent usage trends** and **threshold levels** to decide if restocking is required.  
      - Restock if:  
        - The stock level is below the threshold, and  
        - The usage trend shows multiple decreases.  
    
      4️⃣ **Identify the Best Supplier**  
         - Use the **GraphSupplierLeadTimeQueryTool** to get supplier lead times.  
         - Select the **fastest** supplier. If multiple suppliers have the same delivery time, break ties randomly.  
    
      5️⃣ **Request User Confirmation**  
        - If restocking is necessary, notify the user and provide your rationale.  
        - Suggest the best supplier and ask for confirmation before proceeding.      
      
      6️⃣ **Execute Restock (if confirmed)**  
        - If the user agrees, execute a restock using the **RestockItemTool**. This will update the blockchain. YOU MUST DO THIS.    
    
      ### **Example Conversation**
      **User:** "Check if Item 3 needs restocking."  
      **AI:** "Item 3 has dropped below its threshold. The best supplier is FreshFoods Inc. with a delivery time of 24 hours. Proceed with restock?"  
    
      Follow this process consistently and always provide clear explanations for your decisions.

      DO **NOT** answer in markdown format.
    `,
    });

    const exportedWallet = await agentkit.exportWallet();
    fs.writeFileSync(WALLET_DATA_FILE, exportedWallet);

    return { agent, config: agentConfig };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

async function startSocketServer() {
  const { agent, config } = await initializeAgent();

  const channel = supabase
    .channel("ai_messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "ai_messages",
      },
      async (payload) => {
        const { new: newMessage } = payload;
        console.log("Received new message:", newMessage.content);
        try {
          const stream = await agent.stream(
            { messages: [new HumanMessage(newMessage.content)] },
            config
          );
          console.log("Agent stream started...");
          console.log(stream);
          for await (const chunk of stream) {
            let content: string | undefined;
            if ("agent" in chunk) {
              content = chunk.agent.messages[0].content;
            } else if ("tools" in chunk) {
              content = chunk.tools.messages[0].content;
            }
            if (content) {
              console.log("Agent response:", content);
              await supabase.from("ai_messages_replies").insert({
                content: content,
                user_id: newMessage.user_id,
                message_type: "agent-response",
              });
            }
          }
        } catch (err: any) {
          console.error("Error processing message:", err.message);
          await supabase.from("ai_messages_replies").insert({
            content: err.message,
            user_id: newMessage.user_id,
            message_type: "agent-error",
          });
        }
      }
    )
    .subscribe();
}

startSocketServer().catch((err) => {
  console.error("Fatal error starting socket server:", err);
  process.exit(1);
});
