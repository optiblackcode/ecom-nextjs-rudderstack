'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { trackPageView, trackOrderReceived, trackFirstPurchase } from '@/lib/rudderstack';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, clearCart, getCartTotal, pincode, isPincodeServiceable } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: pincode || '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    trackPageView('Checkout');

    // Redirect if cart is empty
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  const total = getCartTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (Object.values(formData).some((value) => !value)) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const orderId = `ORD_${Date.now()}`;
    const order = {
      order_id: orderId,
      total,
      products: cart.map((item) => ({
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      currency: 'INR',
    };

    // Track order received
    trackOrderReceived(order);

    // Check if this is first purchase within 7 days
    if (user) {
      const userCreatedDate = new Date(user.createdAt);
      const now = new Date();
      const daysSinceCreation = Math.floor(
        (now.getTime() - userCreatedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceCreation <= 7 && !user.firstPurchaseDate) {
        trackFirstPurchase(user.id, orderId, total);

        // Update user with first purchase date (in a real app, this would be done on the backend)
        user.firstPurchaseDate = new Date().toISOString();
      }
    }

    // Clear cart
    clearCart();

    setIsProcessing(false);

    // Redirect to success page
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                    placeholder="123 Main Street, Apartment 4B"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                      placeholder="Mumbai"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                      placeholder="Maharashtra"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark text-white border border-gray-700 focus:border-primary focus:outline-none"
                      placeholder="400001"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary text-dark py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {isProcessing ? 'Processing Order...' : `Place Order - ₹${total}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray rounded-lg p-6 border border-gray-800 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-400">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-3">
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

            {isPincodeServiceable && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-green-500 mb-2">
                  ✓ Fast delivery available to {pincode}
                </p>
                <p className="text-xs text-gray-400">
                  Expected delivery: 60 mins - 2 hours
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
