'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { trackPageView } from '@/lib/rudderstack';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    trackPageView('Order Confirmation');

    if (!orderId) {
      router.push('/');
    }
  }, [orderId, router]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-400 mb-8">
          Thank you for your order. We've received it and will start processing it right away.
        </p>

        <div className="bg-gray rounded-lg p-8 border border-gray-800 mb-8">
          <p className="text-sm text-gray-400 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-primary mb-6">{orderId}</p>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-lg mb-2">Expected Delivery</p>
            <p className="text-3xl font-bold">60 mins - 2 hours</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400">
            We've sent a confirmation email with your order details.
          </p>
          <p className="text-gray-400">
            You can track your order status from your account.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-dark px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="bg-gray border border-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-primary transition"
          >
            View Orders
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-gray rounded-lg p-6 border border-gray-800">
            <div className="text-primary mb-2">📦</div>
            <h3 className="font-semibold mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-400">
              Your order will be delivered within 60 mins to 2 hours
            </p>
          </div>

          <div className="bg-gray rounded-lg p-6 border border-gray-800">
            <div className="text-primary mb-2">🔒</div>
            <h3 className="font-semibold mb-1">Secure Payment</h3>
            <p className="text-sm text-gray-400">
              Your payment information is safe and secure
            </p>
          </div>

          <div className="bg-gray rounded-lg p-6 border border-gray-800">
            <div className="text-primary mb-2">💬</div>
            <h3 className="font-semibold mb-1">24/7 Support</h3>
            <p className="text-sm text-gray-400">
              Contact us anytime for help with your order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
