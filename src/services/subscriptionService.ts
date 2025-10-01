import { supabase } from '../lib/supabase';

export type PlanType = 'free' | 'pro' | 'team';
export type BillingPeriod = 'monthly' | 'annual';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'incomplete';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  plan_type: PlanType;
  billing_period: BillingPeriod | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentEvent {
  id: string;
  user_id: string;
  stripe_event_id: string;
  event_type: string;
  amount: number | null;
  currency: string | null;
  status: string;
  metadata: Record<string, any>;
  created_at: string;
}

export const createCheckoutSession = async (
  planType: 'pro' | 'team',
  billingPeriod: BillingPeriod
): Promise<string> => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const successUrl = `${window.location.origin}/checkout/success`;
  const cancelUrl = `${window.location.origin}/checkout/cancel`;

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-create-checkout`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planType,
        billingPeriod,
        successUrl,
        cancelUrl,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const data = await response.json();
  return data.url;
};

export const createPortalSession = async (): Promise<string> => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const returnUrl = `${window.location.origin}/settings`;

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-create-portal`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ returnUrl }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create portal session');
  }

  const data = await response.json();
  return data.url;
};

export const getCurrentSubscription = async (): Promise<Subscription | null> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data;
};

export const getPaymentHistory = async (): Promise<PaymentEvent[]> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('payment_events')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }

  return data || [];
};

export const getEntryLimit = (planType: PlanType): number => {
  switch (planType) {
    case 'free':
      return 20;
    case 'pro':
    case 'team':
      return -1;
    default:
      return 20;
  }
};

export const getEntryCount = async (): Promise<number> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return 0;
  }

  const { count, error } = await supabase
    .from('entries')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (error) {
    console.error('Error counting entries:', error);
    return 0;
  }

  return count || 0;
};

export const canCreateEntry = async (): Promise<boolean> => {
  const subscription = await getCurrentSubscription();
  const planType = subscription?.plan_type || 'free';
  const limit = getEntryLimit(planType);

  if (limit === -1) {
    return true;
  }

  const count = await getEntryCount();
  return count < limit;
};

export const getPlanDisplayName = (planType: PlanType): string => {
  switch (planType) {
    case 'free':
      return 'Free';
    case 'pro':
      return 'Pro';
    case 'team':
      return 'Team';
    default:
      return 'Free';
  }
};

export const getPlanPrice = (planType: 'pro' | 'team', billingPeriod: BillingPeriod): string => {
  const prices: Record<string, string> = {
    pro_monthly: '$5/mo',
    pro_annual: '$50/yr',
    team_monthly: '$10/mo',
    team_annual: '$100/yr',
  };

  return prices[`${planType}_${billingPeriod}`] || '';
};
