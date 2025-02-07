import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { OrderItem } from "../checkout/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const generateDecrementCommand = (jsonString: string): string => {
  try {
    const items: OrderItem[] = JSON.parse(jsonString);

    const itemList = items.map((item) =>
      JSON.stringify({ name: item.name, quantity: item.quantity }, null, 2)
    ).join("\n");

    return `Decrement stock of the following items\n\n${itemList}`;
  } catch (error) {
    console.error("Error formatting decrement command:", error);
    return "Error formatting decrement command"
  }
};

export async function POST(request: Request) {
  try {
    // Parse the JSON payload from the request body
    const payload = await request.json();

    // const userId = await getUserId();
    const userId = await uuidv4();

    // Extract the specific value you need
    const items: string = payload?.event?.data?.metadata?.items
    console.log(items)
    const stockReductionCommand = generateDecrementCommand(items)

    const result = await supabase
      .from("ai_messages")
      .insert({ content: stockReductionCommand, user_id: userId });
    console.log("UserId: ", userId)
    console.log("Supabase Response: ", result);

    // Respond back with the extracted value or a success message
    return NextResponse.json({
      message: "Items sold",
      items,
    },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Invalid request payload or processing error" },
      { status: 400 }
    );
  }
}