"use client";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dotenv from "dotenv";
import { ethers } from "ethers";
import {
  Loader2,
  ShoppingCart,
  TrendingDown
} from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

dotenv.config({ path: '../.env' });

export default function InventoryDashboard() {
  const [decreaseItemId, setDecreaseItemId] = useState("");
  const [decreaseAmount, setDecreaseAmount] = useState("");

  const [restockItemId, setRestockItemId] = useState("");
  const [restockAmount, setRestockAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const contractABI = [
    "function decreaseStock(uint256 itemId, uint256 amount) public",
    "function restockItem(uint256 itemId, uint256 restockAmount) public",
  ];

  const getContract = () => {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BASE_RPC_URL
    );
    const signer = new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY!,
      provider
    );
    return new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      contractABI,
      signer
    );
  };

  const handleTransaction = async (
    transaction: Promise<any>,
    successMessage: string
  ) => {
    setLoading(true);
    try {
      const tx = await transaction;
      await tx.wait();
      toast.success(successMessage, {
        position: "bottom-center",
      });
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const decreaseStockInContract = () => {
    const contract = getContract();
    handleTransaction(
      contract.decreaseStock(
        Number.parseInt(decreaseItemId),
        Number.parseInt(decreaseAmount)
      ),
      "Stock decreased successfully!"
    );
  };

  const restockItemInContract = () => {
    const contract = getContract();
    handleTransaction(
      contract.restockItem(
        Number.parseInt(restockItemId),
        Number.parseInt(restockAmount)
      ),
      "Item restocked successfully!"
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Section id="inventory-management" title="Inventory Management Dashboard">
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              <div className="flex gap-2 items-center">
                <CardTitle>Decrease Stock</CardTitle>
                <TrendingDown />
              </div>{" "}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Item ID"
                  value={decreaseItemId}
                  onChange={(e) => setDecreaseItemId(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Amount to Decrease"
                  value={decreaseAmount}
                  onChange={(e) => setDecreaseAmount(e.target.value)}
                  type="number"
                />
                <Button
                  onClick={decreaseStockInContract}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Decrease Stock
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex gap-2 items-center">
                <CardTitle>Restock Item</CardTitle>
                <ShoppingCart />
              </div>{" "}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Item ID"
                  value={restockItemId}
                  onChange={(e) => setRestockItemId(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Restock Amount"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(e.target.value)}
                  type="number"
                />
                <Button
                  onClick={restockItemInContract}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Restock Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Toaster />
      </Section>
    </div>
  );
}
