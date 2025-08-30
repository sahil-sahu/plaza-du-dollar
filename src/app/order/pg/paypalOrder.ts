import axios from "axios";

type CreatePaypalOrderArgs = {
  value: number;
  currencyCode: string;
  returnUrl: string;
  cancelUrl: string;
};

interface PaypalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export type PaypalOrderResult = {
  id: string;
  approvalUrl: string;
};

// Token cache interface
interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

// Global token cache
let tokenCache: TokenCache | null = null;

async function getPaypalAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const base = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const tokenRes = await axios.post(
    `${base}/v1/oauth2/token`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    }
  );

  const accessToken = tokenRes.data.access_token as string;
  const expiresIn = tokenRes.data.expires_in as number;
  
  // Cache the token with expiration (subtract 5 minutes as buffer)
  const expiresAt = Date.now() + (expiresIn - 300) * 1000;
  tokenCache = {
    accessToken,
    expiresAt,
  };

  return accessToken;
}

export async function createPaypalOrder(args: CreatePaypalOrderArgs): Promise<PaypalOrderResult> {
  const { value, currencyCode, returnUrl, cancelUrl } = args;
  const base = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

  const accessToken = await getPaypalAccessToken();

  const orderRes = await axios.post(
    `${base}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currencyCode,
            value: (Math.round(value * 100) / 100).toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data: PaypalOrderResponse = orderRes.data;

  const id: string = data.id;
  const approvalUrl: string | undefined = data.links.find((l) => l.rel === "approve")?.href;
  if (!approvalUrl) {
    throw new Error("Missing approval URL from PayPal response");
  }

  return { id, approvalUrl };
}

//paypal