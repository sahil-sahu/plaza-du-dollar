import fs from "fs/promises"
import crypto from "crypto"
import crc32 from "buffer-crc32";
import { NextResponse } from 'next/server';
import { databases } from "@/appwrite_server";
import { Query } from "node-appwrite";

const CACHE_DIR = './certs';
const WEBHOOK_ID = process.env.PAYPAL_PAYMENT_HOOK_KEY;

interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  resource: {
    id: string;
    status?: string;
    purchase_units?: Array<{
      reference_id?: string;
      custom_id?: string;
    }>;
  };
}

async function downloadAndCache(url: string, cacheKey?: string) {
  if(!cacheKey) {
    cacheKey = url.replace(/\W+/g, '-')
  }
  const filePath = `${CACHE_DIR}/${cacheKey}`;
 
  // Check if cached file exists
  const cachedData = await fs.readFile(filePath, 'utf-8').catch(() => null);
  if (cachedData) {
    return cachedData;
  }
 
  // Download the file if not cached
  const response = await fetch(url);
  const data = await response.text()
  await fs.writeFile(filePath, data);
 
  return data;
}

export async function POST(request: Request) {
  const headers = request.headers;
  const event = await request.text();
  let data: PayPalWebhookEvent;

  try {
    data = JSON.parse(event);
  } catch (error) {
    console.error('Error parsing webhook event:', error);
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const isSignatureValid = await verifySignature(event, headers);
  if (!isSignatureValid) {
    // console.log(`Signature is not valid for ${data?.id} ${headers.get('correlation-id')}`);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  // console.log('Signature is valid.');
  // console.log(`Received event`, JSON.stringify(data, null, 2));

  // Process payment completed events
  if (data.event_type === 'CHECKOUT.ORDER.COMPLETED' || data.event_type === 'CHECKOUT.ORDER.APPROVED') {
    try {
      const paymentId = data.resource.id;
      const status = data.resource.status?.toLowerCase() || '';
      
      if (!paymentId) {
        console.warn('No payment ID found in PayPal webhook event');
        return NextResponse.json(
          { error: 'No payment ID in webhook payload' },
          { status: 400 }
        );
      }

      // Find the order in Appwrite by transactionId (which should match PayPal's order ID)
      const { documents: orders } = await databases.listDocuments(
        '67b8c653002efe0cdbb2', // Your database ID
        'orders', // Your collection ID
        [
          Query.equal('transactionId', paymentId),
          Query.limit(1)
        ]
      );

      if (orders.length > 0) {
        const order = orders[0];
        
        // Update the order status based on payment status
        await databases.updateDocument(
          '67b8c653002efe0cdbb2', // Your database ID
          'orders', // Your collection ID
          order.$id,
          {
            paymentStatus: 'paid',
            orderStatus: 'processing',
            // transactionId: paymentId, // Uncomment if you want to store PayPal's payment ID
            // receiptUrl: `https://www.paypal.com/activity/payment/${paymentId}` // Example receipt URL
          }
        );

        // console.log(`Updated order ${order.$id} with payment status: ${status}`);
      } else {
        console.warn(`No order found with transactionId: ${paymentId}`);
      }
    } catch (error) {
      console.error('Error updating order status in Appwrite:', error);
      return NextResponse.json(
        { error: 'Unable to update order status' },
        { status: 500 }
      );
    }
  }
  
  return NextResponse.json(
    { 
      success: true, 
      eventId: data.id,
      eventType: data.event_type,
      status: data.resource.status
    },
    { status: 200 }
  );
}

async function verifySignature(event: string, headers: Request["headers"]) {
  const transmissionId = headers.get('paypal-transmission-id')
  const timeStamp = headers.get('paypal-transmission-time')
  const crc = parseInt("0x" + crc32(event).toString('hex')); // hex crc32 of raw event data, parsed to decimal form

  const message = `${transmissionId}|${timeStamp}|${WEBHOOK_ID}|${crc}`
  // console.log(`Original signed message ${message}`);

  const certPem = await downloadAndCache(headers.get('paypal-cert-url') || '');

  // Create buffer from base64-encoded signature
  const signatureBuffer = Buffer.from(headers.get('paypal-transmission-sig') || '', 'base64');

  // Create a verification object
  const verifier = crypto.createVerify('SHA256');

  // Add the original message to the verifier
  verifier.update(message);

  return verifier.verify(certPem, signatureBuffer);
}