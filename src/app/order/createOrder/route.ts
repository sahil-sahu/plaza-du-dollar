import { databases } from "@/appwrite_server";
import { NextRequest, NextResponse } from "next/server";
import { Client, Account, ID, Query } from "node-appwrite";
import type { Product } from "@/types";
import { createPaypalOrder } from "../pg/paypalOrder";
import { createSquareOrder } from "../pg/squareOrder";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized", message: "Missing or invalid Authorization header" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");

    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('67b8c50700125c658601')
      .setJWT(token);
    const account = new Account(client);
    let user;
    try {
      user = await account.get();
    } catch (e) {
      return NextResponse.json({ error: "Unauthorized", message: "Invalid or expired token" }, { status: 401 });
    }
    // console.log(user);
    const payload = await req.json();

    // Fetch user's cart items
    let cartResponse: any;
    try {
      cartResponse = await databases.listDocuments(
        "67b8c653002efe0cdbb2",
        "cart",
        [Query.equal("customer_id", user.$id)]
      );
    } catch (e) {
      return NextResponse.json({ error: "InternalError", message: "Failed to read cart" }, { status: 500 });
    }

    if (!cartResponse?.documents || cartResponse.documents.length === 0) {
      return NextResponse.json({ error: "DataInconsistency", message: "Cart is empty" }, { status: 400 });
    }
    
    let orderedItems: { product: string; productName: string; productPrice: number; quantity: number }[] = [];
    try {
      orderedItems = (cartResponse.documents || []).map((it: any) => {
        const product = it.product as Product;
        const productId = product.$id;
        const productName = product.name;
        const sale = product.salePrice;
        if (sale === undefined || sale === null || Number.isNaN(Number(sale))) {
          throw new Error(`Missing salePrice for product ${productId}`);
        }
        const productPrice = Number(sale);
        return {
          product: productId,
          productName,
          productPrice,
          quantity: Number(it.quantity) || 0,
        };
      });
    } catch (e: any) {
      return NextResponse.json({ error: "DataInconsistency", message: e?.message || "Invalid cart items" }, { status: 400 });
    }

    const total = orderedItems.reduce(
      (sum: number, item: any) => sum + (item.productPrice || 0) * (item.quantity || 0),
      0
    );
    
    const orderDoc = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      userId: user.$id,
      company: payload.company || null,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      zip: payload.zip,
      email: payload.email,
      phone: payload.phone,
      notes: payload.notes || null,
      paymentMethod: payload.paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
      transactionId: null,
      orderedItems,
      total,
    };

    let created: any;
    try {
      created = await databases.createDocument(
        "67b8c653002efe0cdbb2",
        "orders",
        ID.unique(),
        orderDoc,
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "InternalError", message: "Failed to create order" }, { status: 500 });
    }
    // console.log(created)

    // Handle different payment methods
    let approvalUrl: string | undefined;
    let checkoutUrl: string | undefined;
    
    if (payload.paymentMethod === "paypal") {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const { id, approvalUrl: url } = await createPaypalOrder({
          value: total,
          currencyCode: "CAD",
          returnUrl: `${baseUrl}/order/paypal-success?oid=${created.$id}`,
          cancelUrl: `${baseUrl}/order/cancel?oid=${created.$id}`,
        });
        await databases.updateDocument(
          "67b8c653002efe0cdbb2",
          "orders",
          created.$id,
          { transactionId: id }
        );
        approvalUrl = url;
      } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "InternalError", message: "Failed to create PayPal order" }, { status: 500 });
      }
    } else if (payload.paymentMethod === "square") {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const { id, checkoutUrl: url } = await createSquareOrder({
          value: total,
          currencyCode: "USD",
          returnUrl: `${baseUrl}/order/square-success?oid=${created.$id}`,
          cancelUrl: `${baseUrl}/order/cancel?oid=${created.$id}`,
          orderId: created.$id,
        });
        await databases.updateDocument(
          "67b8c653002efe0cdbb2",
          "orders",
          created.$id,
          { transactionId: id }
        );
        checkoutUrl = url;
      } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "InternalError", message: "Failed to create Square order" }, { status: 500 });
      }
    }

    // Clear the user's cart after successful order creation
    try {
      const docs = cartResponse.documents || [];
      await Promise.all(
        docs.map((doc: any) =>
          databases.deleteDocument("67b8c653002efe0cdbb2", "cart", doc.$id)
        )
      );
    } catch (_) {
      // Non-fatal: if cart clear fails, we still return the created order
    }

    return NextResponse.json({ 
      ok: true, 
      orderId: created.$id, 
      order: created, 
      approvalUrl, 
      checkoutUrl 
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "InternalError", message: "Unexpected server error" }, { status: 500 });
  }
}