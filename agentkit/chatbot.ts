import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { ethers } from "ethers";
import dotenv from "dotenv";
import { Tool } from "@langchain/core/tools";
import fs from "fs";
import { z } from "zod";
import readline from "readline";

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

class DecrementStockTool extends Tool {
    name = "DecrementStock";
    description = "A tool to decrement stock levels of a product after a purchase.";
  
    /**
     * 1) Single top-level `input` field
     * 2) Transform to (string | undefined)
     */
    schema = z
      .object({
        input: z.string().optional(),
      })
      .transform(({ input }) => input);
  
    /**
     * The `_call()` method's argument is the **transformed** type:
     *    (string | undefined)
     */
    async _call(input: string | undefined): Promise<string> {
      if (!input) {
        return `Error: No input provided. Provide a JSON string with { "productId": "...", "quantity": ... }.`;
      }
  
      let productId: string | number;
      let quantity: number;
  
      // 1. Parse the JSON from the user-provided string
      try {
        const parsed = JSON.parse(input);
        productId = parsed.productId;
        quantity = parsed.quantity;
      } catch (err) {
        return `Error: Invalid JSON in input. ${err}`;
      }
  
      // 2. Validate productId & quantity
      if (productId === undefined || quantity === undefined) {
        return `Error: Missing productId or quantity in parsed JSON. Received: ${input}`;
      }
  
      // Convert productId to a number if needed
      const numProductId = parseInt(productId as string, 10);
      if (isNaN(numProductId)) {
        return `Error: productId ("${productId}") is not a valid number.`;
      }
  
      // 3. Run your ethers logic
      try {
        const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
        const contractAddress = process.env.CONTRACT_ADDRESS!;
  
        const contractABI = [
          "function decrementStock(uint256 productId, uint256 quantity) public",
          "function stockLevels(uint256 productId) public view returns (uint256)",
        ];
  
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  
        // Check stock levels
        const currentStock = await contract.stockLevels(numProductId);
        if (currentStock < quantity) {
          return `Error: Not enough stock. Current stock: ${currentStock}`;
        }
  
        // Execute transaction
        const tx = await contract.decrementStock(numProductId, quantity);
        await tx.wait();
  
        const newStock = await contract.stockLevels(numProductId);
        return `Transaction successful! Stock for product ${numProductId} is now ${newStock}.`;
      } catch (error: any) {
        return `Transaction failed: ${error.message}`;
      }
    }
  }

const decrementStockTool = new DecrementStockTool();


export class RestockProductTool extends Tool {
  name = "RestockProduct";
  description =
    "A tool to manually restock a product by increasing its stock quantity.";

  /**
   * 1) Single top-level `input` field
   * 2) Transform to (string | undefined) to match the Tool's expected type
   */
  schema = z
    .object({
      input: z.string().optional(),
    })
    .transform(({ input }) => input);

  /**
   * The `_call()` method receives (string | undefined)
   * from the transformed schema above.
   */
  async _call(input: string | undefined): Promise<string> {
    // Check if JSON input was provided
    if (!input) {
      return `Error: No input provided. Provide a JSON string with { "productId": "...", "quantity": ... }.`;
    }

    let productId: string | number;
    let quantity: number;

    // 1. Parse the JSON from the user-provided string
    try {
      const parsed = JSON.parse(input);
      productId = parsed.productId;
      quantity = parsed.quantity;
    } catch (err) {
      return `Error: Invalid JSON in input. ${err}`;
    }

    // 2. Validate productId & quantity
    if (productId === undefined || quantity === undefined) {
      return `Error: Missing productId or quantity in parsed JSON. Received: ${input}`;
    }

    // Convert productId to a number if needed
    const numProductId = parseInt(productId as string, 10);
    if (isNaN(numProductId)) {
      return `Error: productId ("${productId}") is not a valid number.`;
    }

    // 3. Run your ethers logic to call restockProduct
    try {
      const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
      const contractAddress = process.env.CONTRACT_ADDRESS!;

      const contractABI = [
        "function restockProduct(uint256 productId, uint256 quantity) public",
        "function stockLevels(uint256 productId) public view returns (uint256)",
      ];

      const contract = new ethers.Contract(contractAddress, contractABI, wallet);

      // Execute transaction
      const tx = await contract.restockProduct(numProductId, quantity);
      await tx.wait();

      // Check new stock level
      const newStock = await contract.stockLevels(numProductId);
      return `Transaction successful! Stock for product ${numProductId} is now ${newStock}.`;
    } catch (error: any) {
      return `Transaction failed: ${error.message}`;
    }
  }
}

const incrementStockTool = new RestockProductTool();

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

    tools.push(decrementStockTool);
    tools.push(incrementStockTool);

    const memory = new MemorySaver();
    const agentConfig = { configurable: { thread_id: "CDP Inventory Bot" } };

    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are an AI-powered inventory assistant using Coinbase CDP AgentKit.
        Your primary functions:
        - **Track inventory**: Monitor product stock levels.
        - **Decrement stock**: Process sales and update stock.
        - **Handle blockchain transactions**: Execute on-chain stock updates.

        Example:
        User: "Sell 3 units of product 5."
        You: "Transaction successful! Stock for product 5 is now 12."

        How can I assist you? 🛒.
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
