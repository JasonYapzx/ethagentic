import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { ItemAdded } from "../generated/schema"
import { ItemAdded as ItemAddedEvent } from "../generated/Contract/Contract"
import { handleItemAdded } from "../src/contract"
import { createItemAddedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let itemId = BigInt.fromI32(234)
    let name = "Example string value"
    let quantity = BigInt.fromI32(234)
    let threshold = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let supplier = "Example string value"
    let newItemAddedEvent = createItemAddedEvent(
      itemId,
      name,
      quantity,
      threshold,
      price,
      supplier
    )
    handleItemAdded(newItemAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ItemAdded created and stored", () => {
    assert.entityCount("ItemAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ItemAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "itemId",
      "234"
    )
    assert.fieldEquals(
      "ItemAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "ItemAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "quantity",
      "234"
    )
    assert.fieldEquals(
      "ItemAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "threshold",
      "234"
    )
    assert.fieldEquals(
      "ItemAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "ItemAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "supplier",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
