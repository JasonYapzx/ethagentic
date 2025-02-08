import { BigInt } from "@graphprotocol/graph-ts";
import {
  ItemAdded as ItemAddedEvent,
  LowStockDetected as LowStockDetectedEvent,
  RestockInitiated as RestockInitiatedEvent,
  StockDecreased as StockDecreasedEvent,
  StockIncreased as StockIncreasedEvent,
} from "../generated/Contract/Contract";
import {
  Item,
  ItemAdded,
  LowStockDetected,
  RestockInitiated,
  StockDecreased,
  StockDecreasedData,
  StockIncreased,
  Supplier,
} from "../generated/schema";

export function getOrCreateSupplier(name: string): Supplier {
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
