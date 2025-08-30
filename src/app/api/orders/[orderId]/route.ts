import { databases } from "@/appwrite_server";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const order = await getOrderById((await params).orderId);
    return NextResponse.json(order);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function getOrderById(orderId: string) {
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  // For public order viewing, we'll allow fetching order details
  // In a production app, you might want to add additional security

  try {
    const order = await databases.getDocument(
      "67b8c653002efe0cdbb2",
      "orders",
      orderId
    );

    return order;
  } catch (error: unknown) {
    if (error instanceof AppwriteException && error?.code === 404) {
      throw new Error("Order not found");
    }
    throw error;
  }
}
