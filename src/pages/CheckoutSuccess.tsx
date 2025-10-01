import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

export default function CheckoutSuccess() {
  const { refreshSubscription } = useSubscription();

  useEffect(() => {
    setTimeout(() => {
      refreshSubscription();
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400 border-4 border-black rounded-none mb-6">
            <CheckCircleIcon className="h-10 w-10 text-black" />
          </div>

          <h1 className="text-3xl font-black text-black mb-4">
            PAYMENT SUCCESSFUL!
          </h1>

          <p className="text-lg text-black font-medium mb-6">
            Your subscription has been activated. You now have access to all premium features!
          </p>

          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full px-6 py-3 border-4 border-black rounded-none font-bold text-white bg-black text-center hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              GO TO DASHBOARD
            </Link>

            <Link
              to="/settings"
              className="block w-full px-6 py-3 border-4 border-black rounded-none font-bold text-black bg-white text-center hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              VIEW SUBSCRIPTION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
