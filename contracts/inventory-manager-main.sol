// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InventoryManager {
    // WE ARE OMITTING ALL OWNER CHECKS FOR HACKATHON DEMO PURPOSES
    struct Item {
        string name;
        uint256 quantity;
        uint256 threshold; // Min stock before AI orders more
        uint256 price; // Price per unit
        string supplier;
    }

    mapping(uint256 => Item) public inventory;

    event ItemAdded(
        uint256 indexed itemId,
        string name,
        uint256 quantity,
        uint256 threshold,
        uint256 price,
        string supplier
    );
    event StockIncreased(
        uint256 indexed itemId,
        uint256 amount,
        uint256 newQuantity
    );
    event StockDecreased(
        uint256 indexed itemId,
        uint256 amount,
        uint256 newQuantity
    );
    event LowStockDetected(
        uint256 indexed itemId,
        string name,
        uint256 quantity
    );
    event RestockInitiated(
        uint256 indexed itemId,
        uint256 restockAmount,
        string supplier,
        uint256 totalCost
    );

    function addItem(
        uint256 itemId,
        string memory name,
        uint256 quantity,
        uint256 threshold,
        uint256 price,
        string memory supplier
    ) public {
        inventory[itemId] = Item(name, quantity, threshold, price, supplier);
        emit ItemAdded(itemId, name, quantity, threshold, price, supplier);
    }

    function increaseStock(uint256 itemId, uint256 amount) public {
        inventory[itemId].quantity += amount;
        emit StockIncreased(itemId, amount, inventory[itemId].quantity);
    }

    function decreaseStock(uint256 itemId, uint256 amount) public {
        require(
            inventory[itemId].quantity >= amount,
            "Not enough stock available."
        );
        inventory[itemId].quantity -= amount;
        emit StockDecreased(itemId, amount, inventory[itemId].quantity);

        if (inventory[itemId].quantity < inventory[itemId].threshold) {
            emit LowStockDetected(
                itemId,
                inventory[itemId].name,
                inventory[itemId].quantity
            );
        }
    }

    function restockItem(uint256 itemId, uint256 restockAmount) public {
        Item storage item = inventory[itemId];
        uint256 totalCost = restockAmount * item.price;
        item.quantity += restockAmount;
        emit RestockInitiated(itemId, restockAmount, item.supplier, totalCost);
    }

    function getItem(
        uint256 itemId
    )
        public
        view
        returns (string memory, uint256, uint256, uint256, string memory)
    {
        Item memory item = inventory[itemId];
        return (
            item.name,
            item.quantity,
            item.threshold,
            item.price,
            item.supplier
        );
    }
}
