import React, { useState } from 'react';
import { CreditCardIcon, CalendarIcon, AlertCircleIcon } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { createPortalSession, getPlanDisplayName, getPlanPrice } from '../services/subscriptionService';

export const BillingSection: React.FC = () => {
  const { subscription, planType, isLoading } = useSubscription();
  const [isOpening, setIsOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManageBilling = async () => {
    if (planType === 'free') {
      window.location.href = '/#pricing';
      return;
    }

    setIsOpening(true);
    setError(null);

    try {
      const url = await createPortalSession();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open billing portal');
      setIsOpening(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border-4 border-black rounded-none p-6">
        <p className="text-black font-medium">Loading subscription...</p>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = () => {
    switch (subscription?.status) {
      case 'active':
        return 'bg-green-400';
      case 'past_due':
        return 'bg-yellow-400';
      case 'cancelled':
        return 'bg-gray-300';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
      <div className="flex items-center mb-6">
        <div className="bg-cyan-400 border-2 border-black rounded-none p-2 mr-3">
          <CreditCardIcon className="h-6 w-6 text-black" />
        </div>
        <h2 className="text-2xl font-black text-black">BILLING & SUBSCRIPTION</h2>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border-2 border-black rounded-none p-4 flex items-start">
          <AlertCircleIcon className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-black font-medium text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-4 border-b-2 border-black">
          <div>
            <p className="text-sm font-bold text-black">CURRENT PLAN</p>
            <p className="text-2xl font-black text-black">{getPlanDisplayName(planType)}</p>
            {subscription?.billing_period && planType !== 'free' && (
              <p className="text-sm font-medium text-black mt-1">
                {getPlanPrice(planType as 'pro' | 'team', subscription.billing_period)}
              </p>
            )}
          </div>
          <span className={`px-3 py-1 rounded-none text-sm font-bold text-black border-2 border-black ${getStatusColor()}`}>
            {subscription?.status?.toUpperCase() || 'ACTIVE'}
          </span>
        </div>

        {planType !== 'free' && subscription && (
          <>
            {subscription.current_period_end && (
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-black mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-black">
                    {subscription.cancel_at_period_end ? 'SUBSCRIPTION ENDS' : 'NEXT BILLING DATE'}
                  </p>
                  <p className="text-sm font-medium text-black">
                    {formatDate(subscription.current_period_end)}
                  </p>
                </div>
              </div>
            )}

            {subscription.cancel_at_period_end && (
              <div className="bg-yellow-200 border-2 border-black rounded-none p-4">
                <p className="text-sm font-bold text-black">
                  Your subscription will be cancelled at the end of the current billing period.
                  You will be downgraded to the Free plan.
                </p>
              </div>
            )}
          </>
        )}

        <div className="pt-4">
          <button
            onClick={handleManageBilling}
            disabled={isOpening}
            className="w-full sm:w-auto px-6 py-3 border-4 border-black rounded-none font-bold text-white bg-black hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOpening
              ? 'Opening...'
              : planType === 'free'
              ? 'Upgrade Plan'
              : 'Manage Billing'}
          </button>
          {planType !== 'free' && (
            <p className="text-xs text-black font-medium mt-2">
              Update payment method, view invoices, or change your plan
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
