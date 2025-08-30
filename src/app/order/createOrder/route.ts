import { databases } from "@/appwrite_server";
import { NextRequest, NextResponse } from "next/server";
import { Client, Account, ID, Query, Permission, Role, AppwriteException } from "node-appwrite";
import type { Cart, Product } from "@/types";
import { createPaypalOrder } from "../pg/paypalOrder";
import { createSquareOrder } from "../pg/squareOrder";
import type { Models } from "node-appwrite";
interface OrderItem {
  product: Product|string;
  quantity: number;
  productPrice: number;
  productName: string;
}

interface OrderData {
  firstName: string;
  lastName: string;
  company: string | null;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  email: string;
  phone: string;
  notes: string | null;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  transactionId: string | null;
  orderedItems: OrderItem[];
  total: number;
}

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
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        return NextResponse.json({ error: "Unauthorized", message: "Invalid or expired token" }, { status: 401 });
      }
    }

    const payload = await req.json();
    
    // console.log("Good till here");
    // Fetch user's cart items
    let cartResponse: Models.DocumentList<Models.Document>;
    try {
      if(!user || (user && !user.$id))
        throw new Error("User not found");
      cartResponse = await databases.listDocuments(
        "67b8c653002efe0cdbb2",
        "cart",
        [Query.equal("customer_id", user.$id)]
      );
    } catch {
      return NextResponse.json({ error: "InternalError", message: "Failed to read cart" }, { status: 500 });
    }
    // console.log("Good till here");
    if (!cartResponse?.documents || cartResponse.documents.length === 0) {
      return NextResponse.json({ error: "DataInconsistency", message: "Cart is empty" }, { status: 400 });
    }
    
    let orderedItems: OrderItem[] = [];
    try {
      orderedItems = ((cartResponse.documents || []) as (Cart & Models.Document)[]).map((it) => {
        const product = it.product;
        const productId = product.$id;
        const productName = product.name;
        const sale = product.salePrice;
        if (sale === undefined || sale === null || Number.isNaN(Number(sale))) {
          throw new Error(`Missing salePrice for product ${productId}`);
        }
        const productPrice = Number(sale);
        return {
          product: productId,
          quantity: it.quantity,
          productPrice,
          productName,
        };
      });
    } catch (_error: Error | unknown) {
      if(_error instanceof Error)
        return NextResponse.json({ error: "DataInconsistency", message: _error?.message ?? "Invalid cart items" }, { status: 400 });
      return NextResponse.json({ error: "DataInconsistency", message: "Invalid cart items" }, { status: 400 });
    }

    const total = orderedItems.reduce(
      (sum: number, item: OrderItem) => sum + (item.productPrice || 0) * (item.quantity || 0),
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

    let created: OrderData & Models.Document |undefined;
    try {
      created = await databases.createDocument<OrderData & Models.Document>(
        "67b8c653002efe0cdbb2",
        "orders",
        ID.unique(),
        orderDoc,
        [
          Permission.read(Role.user(user.$id)),
        ]
      );
    } catch (_error) {
      console.error(_error);
      return NextResponse.json({ error: "InternalError", message: "Failed to create order" }, { status: 500 });
    }

    // Handle different payment methods
    let approvalUrl: string | undefined;
    let checkoutUrl: string | undefined;
    if(!created || (created && !created.$id))
      return NextResponse.json({ error: "InternalError", message: "Failed to create order" }, { status: 500 });

    if (payload.paymentMethod === "paypal") {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const { id, approvalUrl: url } = await createPaypalOrder({
          value: total,
          currencyCode: "USD",
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
      } catch (_error) {
        console.error(_error);
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
      } catch (_error) {
        console.error(_error);
        return NextResponse.json({ error: "InternalError", message: "Failed to create Square order" }, { status: 500 });
      }
    }

    // Clear the user's cart after successful order creation
    try {
      const docs = cartResponse.documents || [];
      await Promise.all(
        docs.map((doc) =>
          databases.deleteDocument("67b8c653002efe0cdbb2", "cart", doc.$id)
        )
      );
    } catch {
      // Non-fatal: if cart clear fails, we still return the created order
    }

    return NextResponse.json({ 
      ok: true, 
      orderId: created.$id, 
      order: created, 
      approvalUrl, 
      checkoutUrl 
    }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}