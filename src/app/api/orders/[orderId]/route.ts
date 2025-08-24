import { databases } from "@/appwrite_server";
import { NextRequest, NextResponse } from "next/server";
import { Client, Account, ID } from "node-appwrite";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { error: "Bad Request", message: "Order ID is required" },
        { status: 400 }
      );
    }

    // For public order viewing, we'll allow fetching order details
    // In a production app, you might want to add additional security
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('67b8c50700125c658601');

    try {
      const order = await databases.getDocument(
        "67b8c653002efe0cdbb2",
        "orders",
        orderId
      );

      return NextResponse.json(order);
    } catch (e: any) {
      if (e.code === 404) {
        return NextResponse.json(
          { error: "Not Found", message: "Order not found" },
          { status: 404 }
        );
      }
      throw e;
    }
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
