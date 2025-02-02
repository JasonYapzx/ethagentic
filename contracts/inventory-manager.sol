// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InventoryManager {
    mapping(uint256 => uint256) public stockLevels; // productId => stock
    uint256 public restockThreshold = 50; // Example threshold

    event StockDecremented(uint256 productId, uint256 newStock);
    event RestockTriggered(uint256 productId, uint256 quantity);

    // Constructor to set initial stock levels
    constructor(uint256[] memory productIds, uint256[] memory initialStocks) {
        require(productIds.length == initialStocks.length, "Mismatched inputs");
        for (uint256 i = 0; i < productIds.length; i++) {
            stockLevels[productIds[i]] = initialStocks[i];
        }
    }

    // Decrement stock when a payment is received
    function decrementStock(uint256 productId, uint256 quantity) public {
        require(stockLevels[productId] >= quantity, "Insufficient stock");
        stockLevels[productId] -= quantity;
        emit StockDecremented(productId, stockLevels[productId]);

        // Check if restock is needed
        if (stockLevels[productId] < restockThreshold) {
            uint256 restockQuantity = 100; // Example restock amount
            stockLevels[productId] += restockQuantity;
            emit RestockTriggered(productId, restockQuantity);
        }
    }

    // Function to manually trigger restock (optional)
    function restockProduct(uint256 productId, uint256 quantity) public {
        stockLevels[productId] += quantity;
        emit RestockTriggered(productId, quantity);
    }
}
