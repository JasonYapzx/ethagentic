// pages/api/checkout.ts
import { NextRequest, NextResponse } from "next/server";

export type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

function createBatteryCommercePayload(total: number, items: OrderItem[]) {
  return {
    name: "Demo Order",
    description: "Customer checkout for multiple items",
    pricing_type: "fixed_price",
    local_price: {
      amount: total,
      currency: "USD",
    },
    requested_info: ["name", "email", "address"],
    metadata: {
      order_id: "1234",
      items: items,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const { total, items } = await req.json();
    const commercePayload = createBatteryCommercePayload(total, items);

    const response = await fetch("https://api.commerce.coinbase.com/charges/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": process.env.CB_COMMERCE_API_KEY || "", // Secure usage
      },
      body: JSON.stringify(commercePayload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create charge");
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error creating charge:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};