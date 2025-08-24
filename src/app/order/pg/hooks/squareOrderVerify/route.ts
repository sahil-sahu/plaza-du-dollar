import { NextResponse } from 'next/server';
import { WebhooksHelper } from "square";
import { databases } from "@/appwrite_server";
import { Query } from "node-appwrite";

type Money = {
  amount: number;
  currency: string;
};

type Payment = {
  id: string;
  order_id: string;
  status: string;
  amount_money: Money;
  total_money: Money;
  created_at: string;
  updated_at: string;
  receipt_url?: string;
};

type SquareWebhookData = {
  type: string;
  id: string;
  object: {
    payment: Payment;
  };
};

type SquareWebhookPayload = {
  merchant_id: string;
  type: string;
  event_id: string;
  created_at: string;
  data: SquareWebhookData;
};

async function verifySquareSignature(signature: string, body: string): Promise<boolean> {
  try {
    if (!process.env.SQUARE_PAYMENT_HOOK_KEY) {
      console.error('Missing SQUARE_PAYMENT_HOOK_KEY environment variable');
      return false;
    }

    const url = process.env.SQUARE_WEBHOOK_URL || '';
    const isValid = await WebhooksHelper.verifySignature({
      requestBody: body,
      signatureHeader: signature,
      signatureKey: process.env.SQUARE_PAYMENT_HOOK_KEY,
      notificationUrl: url,
    });

    return isValid;
  } catch (error) {
    console.error('Error verifying Square signature:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Clone the request to read the raw body for signature verification
    const clone = request.clone();
    const body = await clone.text();
    
    // Verify the webhook signature
    const signature = request.headers.get('x-square-hmacsha256-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 401 }
      );
    }

    const isValid = await verifySquareSignature(signature, body);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the JSON payload
    const payload: SquareWebhookPayload = JSON.parse(body);
    
    // Verify the webhook payload structure
    if (!payload?.data?.object?.payment) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const { payment } = payload.data.object;
    const { order_id, status } = payment;
    
    if (!order_id) {
      return NextResponse.json(
        { error: 'Missing order_id in payment object' },
        { status: 400 }
      );
    }

    // console.log('Received Square payment webhook:', {
    //   paymentId: payment.id,
    //   orderId: order_id,
    //   status,
    //   amount: payment.amount_money,
    //   receiptUrl: payment.receipt_url,
    // });

    // Process completed payments
    if (status === 'COMPLETED') {
      try {
        // Find the order in Appwrite by transactionId (which should match Square's order_id)
        const { documents: orders } = await databases.listDocuments(
          '67b8c653002efe0cdbb2', // Your database ID
          'orders', // Your collection ID
          [
            Query.equal('transactionId', order_id),
            Query.limit(1)
          ]
        );

        if (orders.length > 0) {
          const order = orders[0];
          
          // Update the order status
          await databases.updateDocument(
            '67b8c653002efe0cdbb2', // Your database ID
            'orders', // Your collection ID
            order.$id,
            {
              paymentStatus: 'paid',
              orderStatus: 'processing',
            //   transactionId: payment.id,
            //   receiptUrl: payment.receipt_url
            }
          );

        //   console.log(`Updated order ${order.$id} with payment status: paid`);
        } else {
          console.warn(`No order found with transactionId: ${order_id}`);
        }
      } catch (error) {
        console.error('Error updating order status in Appwrite:', error);
        return NextResponse.json(
            { error: 'Unable to update at DB' },
            { status: 500 }
          );
      }
    }
    
    return NextResponse.json(
      { 
        success: true, 
        paymentId: payment.id,
        orderId: order_id,
        status,
        amount: payment.amount_money,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing Square webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Square-HMAC-SHA256-Signature',
    },
  });
}