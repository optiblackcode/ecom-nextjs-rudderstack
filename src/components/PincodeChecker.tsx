'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { trackPincodeSubmitted } from '@/lib/rudderstack';

export default function PincodeChecker() {
  const [inputPincode, setInputPincode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const { pincode, isPincodeServiceable, setPincode } = useStore();

  const checkPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    setIsChecking(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, make pincodes starting with 1, 2, 3, 4, 5 serviceable
    const serviceable = ['1', '2', '3', '4', '5'].includes(inputPincode[0]);

    setPincode(inputPincode, serviceable);
    trackPincodeSubmitted(inputPincode, serviceable);

    setIsChecking(false);
  };

  return (
    <div className="bg-gray rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold mb-4">Check Delivery</h3>

      <form onSubmit={checkPincode} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={inputPincode}
          onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="flex-1 px-4 py-2 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
          maxLength={6}
        />
        <button
          type="submit"
          disabled={isChecking}
          className="px-6 py-2 bg-primary text-dark rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {isChecking ? 'Checking...' : 'Check'}
        </button>
      </form>

      {pincode && (
        <div className="mt-4">
          {isPincodeServiceable ? (
            <div className="flex items-center gap-2 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Delivery available to {pincode}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Delivery not available to {pincode}</span>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4">
        Get delivery within 60 mins to 2 hours for serviceable areas
      </p>
    </div>
  );
}
