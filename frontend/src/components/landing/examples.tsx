import { FeatureSelector } from "@/components/landing/feature-selector";
import { Section } from "@/components/common/section";
import { codeToHtml } from "shiki";

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code: string;
  filePath?: string;
  link: string;
  language?: string;
}

const featureOptions: FeatureOption[] = [
  {
    id: 1,
    title: "Coinbase Developer Platform AgentKit",
    description: "Made use of agent kit to build a chatbot to interact with our inventory with natural language.",
    filePath: "agentkit/chatbot.ts",
    link: "https://github.com/eugenetayyj/ethagentic/blob/207bd92c5cfd56940bc49a11d970bf30e3c925ab/agentkit/chatbot.ts#L90",
    code: `const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

let walletDataStr = fs.existsSync(WALLET_DATA_FILE)
  ? fs.readFileSync(WALLET_DATA_FILE, "utf8")
  : null;

const config = {
  cdpWalletData: walletDataStr || undefined,
  networkId: process.env.NETWORK_ID || "base-sepolia",
  apiKeyName: CDP_API_KEY_NAME,
  apiKeyPrivateKey: CDP_API_KEY_PRIVATE_KEY,
};

const agentkit = await CdpAgentkit.configureWithWallet(config);

const cdpToolkit = new CdpToolkit(agentkit);
const tools = cdpToolkit.getTools();

tools.push(restockItemTool);
tools.push(decreaseStockTool);
tools.push(graphStockAggregationQueryTool);
tools.push(graphSupplierLeadTimeQueryTool);
tools.push(defaultGraphQueryTool);
tools.push(askForRestockConfirmationTool);`,
  },
  {
    id: 2,
    title: "Inventory Management with the Graph",
    description: "Graph Client for inventory management, with pagination, logical operators, and sorting.",
    filePath: "frontend/inventory-manager/src/contract.ts",
    link: "https://github.com/eugenetayyj/ethagentic/blob/a12a43bd112716951fb93b3da676e64f59884fdd/frontend/inventory-manager/src/contract.ts#L20", 
    code: `export function getOrCreateSupplier(name: string): Supplier {
  //Added manually
  let supplier = Supplier.load(name);
  if (supplier == null) {
    supplier = new Supplier(name);
    supplier.name = name;
    supplier.totalOrders = BigInt.fromI32(0);
    supplier.totalAmountSpent = BigInt.fromI32(0);
    supplier.avgDeliveryTime = BigInt.fromI32(0);
  }
  return supplier;
}

export function getOrCreateItem(itemId: BigInt): Item {
  //Added manually
  let item = Item.load(itemId.toString());
  if (item == null) {
    item = new Item(itemId.toString());
    item.itemId = itemId;
    item.name = "";
    item.quantity = BigInt.fromI32(0);
    item.threshold = BigInt.fromI32(0);
    item.price = BigInt.fromI32(0);
    item.supplier = "";
  }
  return item;
}

export function handleItemAdded(event: ItemAddedEvent): void {
  let entity = new ItemAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.itemId = event.params.itemId;
  entity.name = event.params.name;
  entity.quantity = event.params.quantity;
  entity.threshold = event.params.threshold;
  entity.price = event.params.price;
  entity.supplier = event.params.supplier;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Added manually
  let supplier = getOrCreateSupplier(event.params.supplier);
  supplier.totalOrders = supplier.totalOrders.plus(BigInt.fromI32(1));
  supplier.totalAmountSpent = supplier.totalAmountSpent.plus(
    event.params.price
  );
  supplier.avgDeliveryTime = BigInt.fromI32(
    (event.block.timestamp.toI32() % 10) + 1
  );

  supplier.save();

  let item = getOrCreateItem(event.params.itemId);
  item.name = event.params.name;
  item.quantity = event.params.quantity;
  item.threshold = event.params.threshold;
  item.price = event.params.price;
  item.supplier = event.params.supplier;

  item.save();
}

export function handleLowStockDetected(event: LowStockDetectedEvent): void {
  let entity = new LowStockDetected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.itemId = event.params.itemId;
  entity.name = event.params.name;
  entity.quantity = event.params.quantity;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRestockInitiated(event: RestockInitiatedEvent): void {
  let entity = new RestockInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.itemId = event.params.itemId;
  entity.restockAmount = event.params.restockAmount;
  entity.supplier = event.params.supplier;
  entity.totalCost = event.params.totalCost;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let item = getOrCreateItem(event.params.itemId);
  item.quantity = item.quantity.plus(event.params.restockAmount);

  item.save();

  let supplier = getOrCreateSupplier(event.params.supplier);
  supplier.avgDeliveryTime = BigInt.fromI32(
    (event.block.timestamp.toI32() % 10) + 1
  );
  supplier.totalOrders = supplier.totalOrders.plus(BigInt.fromI32(1));
  supplier.totalAmountSpent = supplier.totalAmountSpent.plus(
    event.params.totalCost
  );

  supplier.save();
}

export function handleStockDecreased(event: StockDecreasedEvent): void {
  let entity = new StockDecreased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.itemId = event.params.itemId;
  entity.amount = event.params.amount;
  entity.newQuantity = event.params.newQuantity;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Added manually
  let stockDecreasedData = new StockDecreasedData(
    event.block.timestamp.toString()
  );

  stockDecreasedData.itemId = event.params.itemId;
  stockDecreasedData.amount = event.params.amount;
  stockDecreasedData.newQuantity = event.params.newQuantity;

  stockDecreasedData.save();

  let item = getOrCreateItem(event.params.itemId);
  item.quantity = event.params.newQuantity;

  item.save();
}

export function handleStockIncreased(event: StockIncreasedEvent): void {
  let entity = new StockIncreased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.itemId = event.params.itemId;
  entity.amount = event.params.amount;
  entity.newQuantity = event.params.newQuantity;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let item = getOrCreateItem(event.params.itemId);
  item.quantity = event.params.newQuantity;

  item.save();
}
`,
  },
  {
    id: 3,
    title: "Nillion Integration",
    description: "Securely stored environment variables in Nillion's Secret Vault fetched on initialization.",
    filePath: "agentkit/chatbot.ts",
    link: "https://github.com/eugenetayyj/ethagentic/blob/207bd92c5cfd56940bc49a11d970bf30e3c925ab/agentkit/chatbot.ts#L46", 
    code: `// Nillion Schema IDs
const API_KEY_SCHEMA_ID: string = "3c810f05-74b9-4c4d-846d-081c1045564e";
const collection = new SecretVaultWrapper(
  orgConfig.nodes,
  orgConfig.orgCredentials,
  API_KEY_SCHEMA_ID
);
await collection.init();
// Write to Nillion
const data = [
  {
    CDP_API_KEY_NAME: { $allot: process.env.CDP_API_KEY_NAME },
    CDP_API_KEY_PRIVATE_KEY: { $allot: process.env.CDP_API_KEY_PRIVATE_KEY },
    OPENAI_API_KEY: { $allot: process.env.OPENAI_API_KEY },
    CONTRACT_ADDRESS: { $allot: process.env.CONTRACT_ADDRESS }
  }
];
const dataWritten = await collection.writeToNodes(data);

const decryptedCollectionData = await collection.readFromNodes({});
const {
  _id,
  CDP_API_KEY_NAME,
  CDP_API_KEY_PRIVATE_KEY,
  OPENAI_API_KEY,
  CONTRACT_ADDRESS,
} = decryptedCollectionData[1];`,
  },
  {
    id: 4,
    title: "Automated inventory restocks.",
    description: "Storagent acts as your inventory manager and restocks your inventory when thresholds are hit.",
    filePath: "scripts/browser_use_bot/browserUsePurchase.py",
    link: "https://github.com/eugenetayyj/ethagentic/blob/207bd92c5cfd56940bc49a11d970bf30e3c925ab/frontend/inventory-manager/src/contract.ts#L20", 
    code: `async def purchaseItem(product, website, cookiePath):
  browser = Browser(
    config=BrowserConfig(
      chrome_instance_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    )
  )

  file_path = os.path.join(os.path.dirname(__file__), cookiePath)
  config = BrowserContextConfig(
    cookies_file=file_path
  )
  context = BrowserContext(browser=browser, config=config)

  agent = Agent(
    browser_context=context,
    task=f"""Go to {website}, search for {product}, click on the first product, add it to cart and finally click proceed to checkout.""",
    llm=ChatOpenAI(model="gpt-4-turbo"),
  )
  result = await agent.run(max_steps=50)`,
  language: "python"
  },
];

export async function Examples() {
  const features = await Promise.all(
    featureOptions.map(async (feature) => ({
      ...feature,
      code: await codeToHtml(feature.code, {
        lang: feature.language ? feature.language : "typescript",
        theme: "github-dark",
      }),
    }))
  );

  return (
    <Section id="Code Features" title="Code Features">
      <div className="border-x border-t">
        <FeatureSelector features={features} />
      </div>
    </Section>
  );
}
