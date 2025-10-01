import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  getCurrentSubscription,
  getEntryLimit,
  getEntryCount,
  canCreateEntry,
  type Subscription,
  type PlanType,
} from '../services/subscriptionService';
import { supabase } from '../lib/supabase';

interface SubscriptionContextType {
  subscription: Subscription | null;
  planType: PlanType;
  entryLimit: number;
  entryCount: number;
  canCreate: boolean;
  isLoading: boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [entryCount, setEntryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const planType = subscription?.plan_type || 'free';
  const entryLimit = getEntryLimit(planType);
  const canCreate = entryLimit === -1 || entryCount < entryLimit;

  const refreshSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setEntryCount(0);
      setIsLoading(false);
      return;
    }

    try {
      const [subData, count] = await Promise.all([
        getCurrentSubscription(),
        getEntryCount(),
      ]);

      setSubscription(subData);
      setEntryCount(count);
    } catch (error) {
      console.error('Error refreshing subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSubscription();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          refreshSubscription();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'entries',
          filter: `user_id=eq.${user.id}`,
        },
        async () => {
          const count = await getEntryCount();
          setEntryCount(count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        planType,
        entryLimit,
        entryCount,
        canCreate,
        isLoading,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
