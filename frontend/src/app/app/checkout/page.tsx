"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dotenv from "dotenv";
import { Battery } from "lucide-react";
import { useState } from "react";

dotenv.config({ path: "../../../../.env" });

type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);

  // Demo Product Data
  const productName: string = "Double AA Battery";
  const unitPrice: number = 0.25;
  const total: number = quantity * unitPrice;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const items: OrderItem[] = [
      { name: productName, quantity: quantity, unitPrice: unitPrice },
    ];

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total, items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create charge");
      }

      console.log("Charge created successfully:", data);
      alert(`Order placed! Redirecting to payment page...`);

      if (data.data.hosted_url) {
        window.open(data.data.hosted_url, "_blank");
      }
    } catch (error) {
      console.error("Error creating charge:", error);
      alert("Payment request failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Checkout</CardTitle>
          <CardDescription>
            Complete your purchase for Double AA Batteries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Battery className="w-12 h-12 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">{productName}</h2>
              <p className="text-gray-600">
                Long-lasting, reliable power source
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Label htmlFor="quantity">Quantity:</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number.parseInt(e.target.value)))
              }
              className="w-20"
            />
          </div>
          <div className="text-lg font-semibold mb-4">Total: ${total}</div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <CardFooter>
                <Button type="submit" className="w-full">
                  Check Out
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
