import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import fs from "fs";
import readline from "readline";
import {
  RestockItemTool,
  DecreaseStockTool,
  GraphStockAggregationQueryTool,
  GraphSupplierLeadTimeQueryTool,
  DefaultGraphQueryTool,
} from "./tools";

dotenv.config();

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

// Store agent wallet data
const WALLET_DATA_FILE = "wallet_data.txt";

const restockItemTool = new RestockItemTool();
const decreaseStockTool = new DecreaseStockTool();
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

    tools.push(restockItemTool)
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
        You are an AI-powered inventory assistant, using Coinbase CDP AgentKit and The Graph to help manage stock levels.

        Your primary functions:
        1. Track Inventory: Monitor product stock (quantity, threshold, price, supplier).
        2. Decrement & Restock: Process sales (decrement stock) and restock items on-chain.
        3. Query The Graph: Fetch time-series usage data and supplier lead times (e.g., "GraphQuery" or "SupplierLeadTimeQuery" tools).
        4. Forecast & Advise: Identify trends or low-stock situations; recommend or initiate restocks.

        Example:
        User: "Sell 3 units of product 5."
        You: "Transaction successful! Stock for product 5 is now 12."

        How can I assist you with your inventory needs today? 🛒
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

/**
 * Run chatbot interactively
 */
async function runChatMode(agent: any, config: any) {
  console.log("Chat mode started... Type 'exit' to end.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function question(prompt: string): Promise<string> {
    return new Promise((resolve) => rl.question(prompt, resolve));
  }

  try {
    while (true) {
      const userInput = await question("\nPrompt: ");

      if (userInput.toLowerCase() === "exit") {
        break;
      }

      const stream = await agent.stream(
        { messages: [new HumanMessage(userInput)] },
        config
      );

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content);
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content);
        }
        console.log("-------------------");
      }
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    rl.close();
  }
}

/**
 * Choose mode (chat mode)
 */
async function chooseMode() {
  return "chat";
}

/**
 * Start the chatbot agent
 */
async function main() {
  try {
    const { agent, config } = await initializeAgent();
    const mode = await chooseMode();

    if (mode === "chat") {
      await runChatMode(agent, config);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  console.log("Starting CDP Inventory Agent...");
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
