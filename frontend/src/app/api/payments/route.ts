import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the JSON payload from the request body
    const payload = await request.json();

    // Extract the specific value you need
    const localAmount = payload?.event?.data?.pricing?.local?.amount;

    // Log the extracted value
    console.log("Pricing Local Amount:", localAmount);

    // Respond back with the extracted value or a success message
    return NextResponse.json({
      message: "Pricing local amount received",
      localAmount,
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