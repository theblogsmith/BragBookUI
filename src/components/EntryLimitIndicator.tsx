import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

export const EntryLimitIndicator: React.FC = () => {
  const { planType, entryLimit, entryCount, isLoading } = useSubscription();

  if (isLoading || planType !== 'free') {
    return null;
  }

  const percentage = (entryCount / entryLimit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className={`bg-white border-4 border-black rounded-none p-4 ${isNearLimit ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold text-black">ENTRIES USED</p>
        <p className="text-sm font-bold text-black">
          {entryCount} / {entryLimit}
        </p>
      </div>

      <div className="w-full bg-gray-200 border-2 border-black rounded-none h-3 mb-3">
        <div
          className={`h-full border-r-2 border-black transition-all ${
            isNearLimit ? 'bg-yellow-400' : 'bg-cyan-400'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {isNearLimit && (
        <div className="bg-yellow-200 border-2 border-black rounded-none p-3 flex items-start">
          <TrendingUpIcon className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-black mb-2">
              You're running out of entries!
            </p>
            <Link
              to="/"
              className="inline-block px-3 py-1 border-2 border-black rounded-none font-bold text-xs text-white bg-black hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
