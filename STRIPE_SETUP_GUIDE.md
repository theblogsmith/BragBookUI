# Stripe Integration Setup Guide

This guide will walk you through setting up Stripe payments for Brag Ledger.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Access to your Supabase project dashboard
- The Brag Ledger application deployed or running locally

## Step 1: Create Stripe Account and Get API Keys

1. Go to https://dashboard.stripe.com/register and create an account
2. Once logged in, navigate to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**
   - For testing, use the test mode keys (they start with `pk_test_` and `sk_test_`)
   - For production, use the live mode keys

## Step 2: Create Stripe Products and Prices

### Create Pro Plan

1. Go to **Products** → **Add product**
2. Create a product named "Brag Ledger Pro"
3. Add two prices:
   - **Monthly**: $5.00 USD recurring monthly
   - **Annual**: $50.00 USD recurring yearly
4. Copy the Price IDs for both (they start with `price_`)

### Create Team Plan

1. Go to **Products** → **Add product**
2. Create a product named "Brag Ledger Team"
3. Add two prices:
   - **Monthly**: $10.00 USD recurring monthly
   - **Annual**: $100.00 USD recurring yearly
4. Copy the Price IDs for both

## Step 3: Configure Stripe Webhooks

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set the endpoint URL to:
   ```
   https://YOUR_SUPABASE_PROJECT_ID.supabase.co/functions/v1/stripe-webhook
   ```
   Replace `YOUR_SUPABASE_PROJECT_ID` with your actual Supabase project reference ID

4. Select the following events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

## Step 4: Add Environment Variables

### Frontend Environment Variables

Add to your `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### Supabase Edge Function Secrets

You need to add secrets to your Supabase project for the Edge Functions to access.

**IMPORTANT:** The Supabase Edge Functions automatically have access to these environment variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

You only need to add the Stripe-specific secrets:

```bash
# Set Stripe Secret Key
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Set Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret_here

# Set Price IDs
STRIPE_PRICE_ID_PRO_MONTHLY=price_your_pro_monthly_price_id
STRIPE_PRICE_ID_PRO_ANNUAL=price_your_pro_annual_price_id
STRIPE_PRICE_ID_TEAM_MONTHLY=price_your_team_monthly_price_id
STRIPE_PRICE_ID_TEAM_ANNUAL=price_your_team_annual_price_id
```

### How to Add Secrets to Supabase

Since the Supabase database is already set up, you'll need to configure these secrets through your Supabase project dashboard or CLI if available. Contact the project administrator to add these secrets to the Edge Functions configuration.

## Step 5: Deploy Edge Functions

The following Edge Functions need to be deployed to your Supabase project:

1. **stripe-webhook** - Handles Stripe webhook events
2. **stripe-create-checkout** - Creates Stripe Checkout sessions
3. **stripe-create-portal** - Creates Stripe Customer Portal sessions

These functions are located in `supabase/functions/` directory.

## Step 6: Run Database Migration

The database migration file `20251001120000_add_stripe_subscriptions.sql` needs to be applied to your Supabase database. This creates the necessary tables:

- `subscriptions` - Stores user subscription data
- `payment_events` - Logs payment events
- Updates `profiles` table with subscription fields

The migration should be applied automatically if using Supabase's migration system.

## Step 7: Test the Integration

### Test with Stripe Test Cards

Use these test card numbers in test mode:

- **Successful payment**: 4242 4242 4242 4242
- **Payment requires authentication**: 4000 0025 0000 3155
- **Payment is declined**: 4000 0000 0000 9995

Use any future expiration date and any 3-digit CVC.

### Testing Flow

1. Log in to your Brag Ledger account
2. Go to the homepage and click on a pricing plan (Pro or Team)
3. You should be redirected to Stripe Checkout
4. Complete the payment with a test card
5. You should be redirected back to the success page
6. Check your subscription status in Settings

### Test Webhooks

1. Use Stripe CLI to test webhooks locally:
   ```bash
   stripe listen --forward-to https://YOUR_SUPABASE_PROJECT_ID.supabase.co/functions/v1/stripe-webhook
   ```

2. Trigger test events:
   ```bash
   stripe trigger checkout.session.completed
   stripe trigger customer.subscription.updated
   ```

## Step 8: Enable Customer Portal

1. Go to **Settings** → **Billing** → **Customer portal**
2. Click **Activate test mode**
3. Configure the portal settings:
   - Enable customers to update payment methods
   - Enable customers to cancel subscriptions
   - Set up branding (optional)
4. Save the configuration

## Step 9: Go Live

When ready to accept real payments:

1. Complete Stripe account verification
2. Switch from test mode to live mode in Stripe Dashboard
3. Update all environment variables with live API keys
4. Update webhook endpoint to use live mode
5. Test thoroughly before announcing

## Troubleshooting

### Webhook Events Not Received

- Verify the webhook URL is correct
- Check that the webhook signing secret is properly configured
- Review webhook delivery attempts in Stripe Dashboard
- Check Edge Function logs in Supabase

### Checkout Session Creation Fails

- Verify Stripe Secret Key is correct
- Check that Price IDs are valid and active
- Review Edge Function logs for errors
- Ensure user is authenticated

### Subscription Not Updating

- Check webhook events are being received
- Verify database policies allow service role to update subscriptions
- Review payment_events table for logged errors
- Check Stripe Dashboard for subscription status

## Security Best Practices

1. **Never expose secret keys** in frontend code or version control
2. **Use environment variables** for all sensitive data
3. **Verify webhook signatures** to prevent unauthorized requests
4. **Use HTTPS only** for webhook endpoints
5. **Monitor webhook delivery** and set up alerts for failures
6. **Regularly rotate API keys** in production
7. **Enable Stripe Radar** for fraud protection

## Support

For Stripe-related issues:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For Supabase-related issues:
- Supabase Documentation: https://supabase.com/docs
- Supabase Support: https://supabase.com/support

## Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Customer Portal Documentation](https://stripe.com/docs/billing/subscriptions/customer-portal)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Supabase Edge Functions Guide](https://supabase.com/docs/guides/functions)
