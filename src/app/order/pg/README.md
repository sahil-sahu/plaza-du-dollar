# Payment Gateway Integration

This directory contains payment gateway implementations for the Plaza Du Dollar e-commerce platform.

## Available Payment Gateways

### 1. PayPal
- **File**: `paypalOrder.ts`
- **Features**: Token caching, OAuth 2.0 authentication, order creation
- **Environment Variables**:
  - `PAYPAL_CLIENT_ID` - Your PayPal application client ID
  - `PAYPAL_CLIENT_SECRET` - Your PayPal application client secret
  - `PAYPAL_API_BASE` - PayPal API base URL (defaults to sandbox)

### 2. Square
- **File**: `squareOrder.ts`
- **Features**: Token caching, OAuth 2.0 authentication, checkout link creation
- **Environment Variables**:
  - `SQUARE_APPLICATION_ID` - Your Square application ID
  - `SQUARE_APPLICATION_SECRET` - Your Square application secret
  - `SQUARE_API_BASE` - Square API base URL (defaults to sandbox)
  - `SQUARE_LOCATION_ID` - Your Square business location ID (for Orders API)

## Implementation Details

### Token Caching
Both payment gateways implement token caching to avoid requesting new access tokens on every request:
- Tokens are cached in memory with expiration tracking
- 5-minute buffer before actual expiration to ensure validity
- Automatic token refresh when expired

### Square Implementation Options
The Square integration provides two implementation approaches:

1. **Payment Links API** (`createSquareOrder`):
   - Simpler implementation using Square's payment links
   - Good for basic checkout flows
   - Less customization options

2. **Orders + Checkout API** (`createSquareOrderV2`):
   - More robust implementation using Square's Orders API
   - Better for complex order management
   - Requires location ID configuration

## Usage

### PayPal
```typescript
import { createPaypalOrder } from "../pg/paypalOrder";

const result = await createPaypalOrder({
  value: 99.99,
  currencyCode: "CAD",
  returnUrl: "https://yoursite.com/success",
  cancelUrl: "https://yoursite.com/cancel"
});
```

### Square
```typescript
import { createSquareOrder } from "../pg/squareOrder";

const result = await createSquareOrder({
  value: 99.99,
  currencyCode: "CAD",
  returnUrl: "https://yoursite.com/success",
  cancelUrl: "https://yoursite.com/cancel",
  orderId: "order_123"
});
```

## Environment Setup

### PayPal Sandbox
```bash
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
```

### Square Sandbox
```bash
SQUARE_APPLICATION_ID=your_sandbox_app_id
SQUARE_APPLICATION_SECRET=your_sandbox_app_secret
SQUARE_API_BASE=https://connect.squareupsandbox.com
SQUARE_LOCATION_ID=your_sandbox_location_id
```

### Production
```bash
# PayPal Production
PAYPAL_API_BASE=https://api-m.paypal.com

# Square Production
SQUARE_API_BASE=https://connect.squareup.com
```

## Error Handling

Both implementations include comprehensive error handling:
- Missing credentials validation
- API response validation
- Network error handling
- Proper error messages for debugging

## Security Considerations

- Access tokens are cached in memory (not persisted)
- Credentials are stored in environment variables
- HTTPS is required for production use
- Implement proper CSRF protection in your frontend

## Testing

### PayPal Sandbox
- Use PayPal sandbox accounts for testing
- Test both successful and failed payment scenarios
- Verify webhook handling (if implemented)

### Square Sandbox
- Use Square sandbox environment for testing
- Test checkout flow end-to-end
- Verify payment confirmation handling

## Future Enhancements

- Webhook support for payment status updates
- Refund processing capabilities
- Subscription payment support
- Multi-currency support
- Payment analytics and reporting
