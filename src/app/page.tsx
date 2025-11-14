'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import PincodeChecker from '@/components/PincodeChecker';
import { products, collections } from '@/data/products';
import { trackPageView } from '@/lib/rudderstack';

export default function Home() {
  useEffect(() => {
    trackPageView('Home');
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-primary to-yellow-400 rounded-2xl p-12 text-dark">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Fast Fashion,
              <br />
              Faster Delivery
            </h1>
            <p className="text-xl mb-6">
              Shop the latest trends with delivery in 60 mins to 2 hours
            </p>
            <Link
              href="/collections/men-clothing"
              className="inline-block bg-dark text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Pincode Checker */}
      <section className="mb-16">
        <PincodeChecker />
      </section>

      {/* Collections */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-gray-300">{collection.description}</p>
                <p className="text-primary mt-2">{collection.productCount} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/collections/men-clothing" className="text-primary hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray rounded-lg p-6 border border-gray-800">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-400">60 mins to 2 hours delivery in serviceable areas</p>
        </div>

        <div className="bg-gray rounded-lg p-6 border border-gray-800">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
          <p className="text-gray-400">100% authentic and premium quality fashion</p>
        </div>

        <div className="bg-gray rounded-lg p-6 border border-gray-800">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-400">Hassle-free returns within 7 days</p>
        </div>
      </section>
    </div>
  );
}
