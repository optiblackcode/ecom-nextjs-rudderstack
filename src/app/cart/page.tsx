'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { trackPageView } from '@/lib/rudderstack';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useStore();

  useEffect(() => {
    trackPageView('Cart');
  }, []);

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Add some products to get started</p>
        <Link
          href="/"
          className="inline-block bg-primary text-dark px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="bg-gray rounded-lg p-4 border border-gray-800 flex gap-4"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="font-semibold hover:text-primary transition"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.product.category}
                  </p>
                  {item.size && (
                    <p className="text-gray-400 text-sm">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-gray-400 text-sm">Color: {item.color}</p>
                  )}
                  <p className="font-bold mt-2">₹{item.product.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Remove
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 rounded border border-gray-700 hover:border-primary transition flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded border border-gray-700 hover:border-primary transition flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-lg">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray rounded-lg p-6 border border-gray-800 sticky top-20">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="text-primary">FREE</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-primary text-dark py-3 rounded-lg font-bold hover:bg-yellow-300 transition mb-4"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="block text-center text-gray-400 hover:text-primary transition"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">
                🚀 Fast delivery available
              </p>
              <p className="text-sm text-gray-400">
                🔒 Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
