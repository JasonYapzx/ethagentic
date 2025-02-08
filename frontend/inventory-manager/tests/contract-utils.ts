import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  ItemAdded,
  LowStockDetected,
  RestockInitiated,
  StockDecreased,
  StockIncreased
} from "../generated/Contract/Contract"

export function createItemAddedEvent(
  itemId: BigInt,
  name: string,
  quantity: BigInt,
  threshold: BigInt,
  price: BigInt,
  supplier: string
): ItemAdded {
  let itemAddedEvent = changetype<ItemAdded>(newMockEvent())

  itemAddedEvent.parameters = new Array()

  itemAddedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "threshold",
      ethereum.Value.fromUnsignedBigInt(threshold)
    )
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam("supplier", ethereum.Value.fromString(supplier))
  )

  return itemAddedEvent
}

export function createLowStockDetectedEvent(
  itemId: BigInt,
  name: string,
  quantity: BigInt
): LowStockDetected {
  let lowStockDetectedEvent = changetype<LowStockDetected>(newMockEvent())

  lowStockDetectedEvent.parameters = new Array()

  lowStockDetectedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  lowStockDetectedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  lowStockDetectedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )

  return lowStockDetectedEvent
}

export function createRestockInitiatedEvent(
  itemId: BigInt,
  restockAmount: BigInt,
  supplier: string,
  totalCost: BigInt
): RestockInitiated {
  let restockInitiatedEvent = changetype<RestockInitiated>(newMockEvent())

  restockInitiatedEvent.parameters = new Array()

  restockInitiatedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  restockInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "restockAmount",
      ethereum.Value.fromUnsignedBigInt(restockAmount)
    )
  )
  restockInitiatedEvent.parameters.push(
    new ethereum.EventParam("supplier", ethereum.Value.fromString(supplier))
  )
  restockInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalCost",
      ethereum.Value.fromUnsignedBigInt(totalCost)
    )
  )

  return restockInitiatedEvent
}

export function createStockDecreasedEvent(
  itemId: BigInt,
  amount: BigInt,
  newQuantity: BigInt
): StockDecreased {
  let stockDecreasedEvent = changetype<StockDecreased>(newMockEvent())

  stockDecreasedEvent.parameters = new Array()

  stockDecreasedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  stockDecreasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stockDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "newQuantity",
      ethereum.Value.fromUnsignedBigInt(newQuantity)
    )
  )

  return stockDecreasedEvent
}

export function createStockIncreasedEvent(
  itemId: BigInt,
  amount: BigInt,
  newQuantity: BigInt
): StockIncreased {
  let stockIncreasedEvent = changetype<StockIncreased>(newMockEvent())

  stockIncreasedEvent.parameters = new Array()

  stockIncreasedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  stockIncreasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stockIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "newQuantity",
      ethereum.Value.fromUnsignedBigInt(newQuantity)
    )
  )

  return stockIncreasedEvent
}
