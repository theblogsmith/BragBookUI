import React from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { getPlanDisplayName } from '../services/subscriptionService';

export const SubscriptionBadge: React.FC = () => {
  const { planType, isLoading } = useSubscription();

  if (isLoading) {
    return null;
  }

  const getBadgeColor = () => {
    switch (planType) {
      case 'pro':
        return 'bg-cyan-400 border-black';
      case 'team':
        return 'bg-pink-400 border-black';
      default:
        return 'bg-yellow-400 border-black';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-none text-sm font-bold text-black border-2 ${getBadgeColor()}`}>
      {getPlanDisplayName(planType)}
    </span>
  );
};
