'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { trackPageView } from '@/lib/rudderstack';

export default function AccountPage() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    trackPageView('Account');

    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-lg">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <p className="text-gray-400">No orders yet. Start shopping to see your orders here.</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-gray rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-dark hover:bg-gray-800 transition">
                Edit Profile
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-dark hover:bg-gray-800 transition">
                Saved Addresses
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-dark hover:bg-gray-800 transition">
                Payment Methods
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-dark hover:bg-gray-800 transition">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
