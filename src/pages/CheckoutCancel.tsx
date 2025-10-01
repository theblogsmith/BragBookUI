import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-pink-300 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 border-4 border-black rounded-none mb-6">
            <XIcon className="h-10 w-10 text-black" />
          </div>

          <h1 className="text-3xl font-black text-black mb-4">
            CHECKOUT CANCELLED
          </h1>

          <p className="text-lg text-black font-medium mb-6">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full px-6 py-3 border-4 border-black rounded-none font-bold text-white bg-black text-center hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              VIEW PRICING
            </Link>

            <Link
              to="/dashboard"
              className="block w-full px-6 py-3 border-4 border-black rounded-none font-bold text-black bg-white text-center hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              GO TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
