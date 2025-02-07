import { z } from "zod";
import { ethers } from "ethers";
import { Tool } from "@langchain/core/tools";
import dotenv from "dotenv";

dotenv.config();

export class RestockItemTool extends Tool {
  name = "RestockItemTool";
  description =
    "A tool to manually restock an item by increasing its quantity in the InventoryManager contract." +
    "This tool must be called to update the smart contract when a restock is done.";
  "If name is provided instead of id, run query the contract to find out which to restock.";

  private contract_address: string;
  constructor(contract_address: string) {
    super();
    this.contract_address = contract_address;
  }

  // Single top-level input -> transform to (string | undefined)
  schema = z
    .object({
      input: z.string().optional(),
    })
    .transform(({ input }) => input);

  /**
   * The `_call()` method receives (string | undefined).
   * We expect JSON like: { "itemId": "...", "restockAmount": ... }.
   */
  async _call(input: string | undefined): Promise<string> {
    if (!input) {
      return `Error: No input provided. Provide a JSON string with { "itemId": "...", "restockAmount": ... }.`;
    }

    let itemId: string | number;
    let restockAmount: number;

    // 1. Parse JSON
    try {
      const parsed = JSON.parse(input);
      itemId = parsed.itemId;
      restockAmount = parsed.restockAmount;
    } catch (err) {
      return `Error: Invalid JSON in input. ${err}`;
    }

    // 2. Validate itemId & restockAmount
    if (itemId === undefined || restockAmount === undefined) {
      return `Error: Missing itemId or restockAmount in parsed JSON. Received: ${input}`;
    }

    // Convert itemId to a number
    const numItemId = parseInt(itemId as string, 10);
    if (isNaN(numItemId)) {
      return `Error: itemId ("${itemId}") is not a valid number.`;
    }

    try {
      // 3. Connect to the contract
      const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
      const contractAddress = this.contract_address;

      const contractABI = [
        "function restockItem(uint256 itemId, uint256 restockAmount) public",
        "function getItem(uint256 itemId) public view returns (string memory, uint256, uint256, uint256, string memory)",
      ];

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        wallet
      );

      // Execute the restockItem transaction
      const tx = await contract.restockItem(numItemId, restockAmount);
      await tx.wait();

      // Check updated quantity
      const [name, newQuantity, threshold, price, supplier] =
        await contract.getItem(numItemId);

      return `Restock successful! Item ${numItemId} ("${name}") is now at quantity: ${newQuantity}.`;
    } catch (error: any) {
      return `Transaction failed: ${error.message}`;
    }
  }
}

export class DecreaseStockTool extends Tool {
  name = "DecreaseStockTool";
  description = `A tool to decrease the stock levels of an existing item in the InventoryManager contract. 
    If name is provided instead of id, run query the contract to find out which to decrement.
    After decrementing the stock level, you have to run a check to decide whether or not restock.`;

  private contract_address: string;
  constructor(contract_address: string) {
    super();
    this.contract_address = contract_address;
  }

  // Single top-level input (JSON string), transform to string | undefined
  schema = z
    .object({
      input: z.string().optional(),
    })
    .transform(({ input }) => input);

  /**
   * The `_call()` method receives (string | undefined) from the transformed schema.
   * We expect JSON like: { "itemId": "...", "amount": ... }.
   */
  async _call(input: string | undefined): Promise<string> {
    if (!input) {
      return `Error: No input provided. Provide a JSON string with { "itemId": "...", "amount": ... }.`;
    }

    let itemId: string | number;
    let amount: number;

    // 1. Parse the JSON from 'input'
    try {
      const parsed = JSON.parse(input);
      itemId = parsed.itemId;
      amount = parsed.amount;
    } catch (err) {
      return `Error: Invalid JSON in input. ${err}`;
    }

    // 2. Validate itemId & amount
    if (itemId === undefined || amount === undefined) {
      return `Error: Missing itemId or amount in parsed JSON. Received: ${input}`;
    }

    // Convert itemId to number if needed
    const numItemId = parseInt(itemId as string, 10);
    if (isNaN(numItemId)) {
      return `Error: itemId ("${itemId}") is not a valid number.`;
    }

    try {
      // 3. Connect to the contract
      const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
      const contractAddress = this.contract_address;

      const contractABI = [
        "function decreaseStock(uint256 itemId, uint256 amount) public",
        "function getItem(uint256 itemId) public view returns (string memory, uint256, uint256, uint256, string memory)",
      ];

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        wallet
      );

      // Execute the decreaseStock transaction
      const tx = await contract.decreaseStock(numItemId, amount);
      await tx.wait();

      // Retrieve the updated item info: (name, quantity, threshold, price, supplier)
      const [name, newQuantity, threshold, price, supplier] =
        await contract.getItem(numItemId);
      return `DecreaseStock successful! Item ${numItemId} ("${name}") is now at quantity: ${newQuantity}. Should I run restock decision process?`;
    } catch (error: any) {
      return `Transaction failed: ${error.message}`;
    }
  }
}

export class GraphStockAggregationQueryTool extends Tool {
  name = "GraphStockAggregationQueryTool";
  description =
    "A tool to query The Graph subgraph for time-series and aggregated usage data. " +
    "Takes one optional input: a JSON string with a 'query' field. " +
    "If not provided, it defaults to a query that retrieves 'stockDecreasedDatas' (item-level usage events) " +
    "and 'stockDecreasedAggregations' (hourly aggregates).";

  // The single top-level input field (optional).
  schema = z
    .object({
      input: z.string().optional(),
    })
    .transform(({ input }) => input);

  // The default query if user doesn't provide one
  private defaultQuery = `
    {
        stockDecreasedDatas {
            id
            itemId
            newQuantity
            amount
            timestamp
        }
        stockDecreasedAggregations(interval: hour, orderBy: timestamp, orderDirection: desc) {
            id
            itemId
            totalAmount
            timestamp
        }
    }
    `;

  async _call(input: string | undefined): Promise<string> {
    let queryToUse: string;

    // 1. Parse JSON from the input if present; otherwise use default
    if (input) {
      try {
        const parsed = JSON.parse(input);
        if (parsed.query) {
          queryToUse = parsed.query;
        } else {
          queryToUse = this.defaultQuery; // fallback if "query" wasn't specified
        }
      } catch (err) {
        return `Error: Unable to parse JSON from 'input'. ${err}`;
      }
    } else {
      // No input provided, use the default query
      queryToUse = this.defaultQuery;
    }

    try {
      await sleep(5000);

      const subgraphUrl =
        process.env.SUBGRAPH_URL ||
        "https://api.thegraph.com/subgraphs/name/your-subgraph";

      const response = await fetch(subgraphUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse }),
      });

      if (!response.ok) {
        return `Error: TheGraph query failed with status ${response.status}.`;
      }

      const data = await response.json();

      return JSON.stringify(data, null, 2);
    } catch (error: any) {
      return `Error while querying The Graph: ${error.message}`;
    }
  }
}

export class GraphSupplierLeadTimeQueryTool extends Tool {
  name = "GraphSupplierLeadTimeQueryTool";
  description =
    "A tool to query The Graph subgraph for supplier lead times. " +
    "Takes one optional input: a JSON string with a 'query' field. " +
    "If not provided, it uses a default query that fetches the first 10 suppliers along with avgDeliveryTime.";

  schema = z
    .object({
      input: z.string().optional(),
    })
    .transform(({ input }) => input);

  private defaultQuery = `
      {
        suppliers(first: 10) {
          id
          name
          totalOrders
          totalAmountSpent
          avgDeliveryTime
        }
      }
    `;

  async _call(input: string | undefined): Promise<string> {
    let queryToUse = this.defaultQuery;

    if (input) {
      try {
        const parsed = JSON.parse(input);
        if (parsed.query) {
          queryToUse = parsed.query;
        }
      } catch (err) {
        return `Error: Unable to parse JSON from 'input'. ${err}`;
      }
    }

    try {
      await sleep(5000);

      const subgraphUrl =
        process.env.SUBGRAPH_URL ||
        "https://api.thegraph.com/subgraphs/name/your-subgraph";

      const response = await fetch(subgraphUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse }),
      });

      if (!response.ok) {
        return `Error: TheGraph query failed with status ${response.status}.`;
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    } catch (error: any) {
      return `Error while querying The Graph: ${error.message}`;
    }
  }
}

export class DefaultGraphQueryTool extends Tool {
  name = "InventoryLevelsGraphQuery";
  description =
    "A tool to query The Graph subgraph for the top 5 suppliers, the items in the inventory and the threshold amounts." +
    "Run this query to get the current inventory levels." +
    "Querying this will give the supplier's id, name, totalOrders, totalAmountSpent" +
    "items shows the CURRENT inventory amounts. it has id, itemId, name, quantity" +
    " itemsAdded shows the INITIAL inventory amounts. it has id, itemId, name, quantity, threshold" +
    "Takes one optional input: a JSON string with a 'query' field. " +
    "If not provided, it uses a default query with 'suppliers(first: 5)' and 'itemAddeds(first: 5)'.";

  schema = z
    .object({
      input: z.string().optional(),
    })
    .transform(({ input }) => input);

  private defaultQuery = `
   {
    suppliers(first: 5) {
        id
        name
        totalOrders
        totalAmountSpent
    }
    items(first: 5) {
        id
        itemId
        name
        quantity
    }
        itemAddeds(first: 5) {
        id
        itemId
        name
        quantity
        threshold
  }
}
    `;

  async _call(input: string | undefined): Promise<string> {
    let queryToUse = this.defaultQuery;

    if (input) {
      try {
        const parsed = JSON.parse(input);
        if (parsed.query) {
          queryToUse = parsed.query;
        }
      } catch (err) {
        return `Error: Unable to parse JSON from 'input'. ${err}`;
      }
    }

    try {
      await sleep(5000);

      const subgraphUrl =
        process.env.SUBGRAPH_URL ||
        "https://api.thegraph.com/subgraphs/name/your-subgraph";
      const response = await fetch(subgraphUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse }),
      });

      if (!response.ok) {
        return `Error: The Graph query failed with status ${response.status}.`;
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    } catch (error: any) {
      return `Error while querying The Graph: ${error.message}`;
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
