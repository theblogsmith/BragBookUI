import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon, TrendingUpIcon } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ isOpen, onClose }) => {
  const { entryCount, entryLimit } = useSubscription();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="bg-yellow-400 border-2 border-black rounded-none p-2 mr-3">
                <TrendingUpIcon className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-black text-black">UPGRADE TO PRO</h3>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:bg-gray-100 rounded-none p-1 border-2 border-black"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-black font-medium mb-4">
              You've reached your entry limit of {entryLimit} entries ({entryCount}/{entryLimit}).
            </p>
            <p className="text-black font-medium">
              Upgrade to Pro or Team to unlock unlimited entries and premium features!
            </p>
          </div>

          <div className="bg-yellow-200 border-2 border-black rounded-none p-4 mb-6">
            <h4 className="font-bold text-black mb-2">Pro Features:</h4>
            <ul className="space-y-1 text-sm text-black">
              <li>✓ Unlimited achievements</li>
              <li>✓ File attachments</li>
              <li>✓ Advanced categorization</li>
              <li>✓ Personalized portfolios</li>
              <li>✓ Review preparation tools</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border-4 border-black rounded-none font-bold text-black bg-white hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Cancel
            </button>
            <Link
              to="/"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-4 border-black rounded-none font-bold text-white bg-black text-center hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
