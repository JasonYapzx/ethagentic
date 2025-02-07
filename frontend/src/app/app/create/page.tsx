"use client";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dotenv from "dotenv";
import { ethers } from "ethers";
import {
  Loader2,
  ShoppingBasket
} from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

dotenv.config({ path: '../.env' });

export default function CreateInventoryPage() {
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");

  const [loading, setLoading] = useState(false);

  const contractABI = [
    "function addItem(uint256 itemId, string name, uint256 quantity, uint256 threshold, uint256 price, string supplier) public",
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

  const addItemToContract = () => {
    const contract = getContract();
    handleTransaction(
      contract.addItem(
        Number.parseInt(itemId),
        name,
        Number.parseInt(quantity),
        Number.parseInt(threshold),
        Number.parseInt(price),
        supplier
      ),
      "Item added successfully!"
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Section id="inventory-management" title="Create Inventory">
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader>
              <div className="flex gap-2 items-center">
                <CardTitle>Add New Item</CardTitle>
                <ShoppingBasket />
              </div>{" "}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Item ID"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Threshold"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Price(in cents)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
                <Button
                  onClick={addItemToContract}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Add Item
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
