import axios from "axios";

type CreateSquareOrderArgs = {
  value: number;
  currencyCode: string;
  returnUrl: string;
  cancelUrl: string;
  orderId: string;
};

export type SquareOrderResult = {
  id: string;
  checkoutUrl: string;
  orderId: string;
};
// https://developer.squareup.com/explorer/square/locations-api/create-location
export async function createSquareOrder(args: CreateSquareOrderArgs): Promise<SquareOrderResult> {
  const { value, currencyCode, returnUrl, cancelUrl, orderId } = args;
  const base = process.env.SQUARE_API_BASE || "https://connect.squareupsandbox.com";
  const locationId = process.env.SQUARE_LOCATION_ID;
  const accessToken = process.env.SQUARE_APPLICATION_SECRET;

  if (!locationId) {
    throw new Error("Missing Square location ID");
  }

  if (!accessToken) {
    throw new Error("Missing Square access token");
  }

  try {
    // Create a checkout link for the order
    const checkoutRes = await axios.post(
      `${base}/v2/online-checkout/payment-links`,
      {
        idempotency_key: `${orderId}-${Date.now()}`,
        checkout_options: {
          redirect_url: `${returnUrl}`,
          // cancel_url: `${cancelUrl}`,
        },
        order: {
          location_id: locationId,
          reference_id: orderId,
          line_items: [
            {
              quantity: "1",
              item_type: "ITEM",
              name: `Order ${orderId}`,
              base_price_money: {
                amount: Math.round(value * 100),
                currency: currencyCode,
              },
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Square-Version": "2025-07-16",
          },
        }
    );

    const checkoutUrl = checkoutRes.data.payment_link.url;
    const squareOrderId = checkoutRes.data.payment_link.order_id;
    if (!checkoutUrl) {
      throw new Error("Missing checkout URL from Square response");
    }

    return { 
      id: squareOrderId, 
      checkoutUrl,
      orderId 
    };
  } catch (error) {
    console.error('Error in createSquareOrder:', error);
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (network errors, HTTP errors, etc.)
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Square API error: ${errorMessage}`);
    }
    // Re-throw any non-Axios errors
    throw new Error(`Failed to create Square order: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
