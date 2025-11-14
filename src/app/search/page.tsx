'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { trackPageView } from '@/lib/rudderstack';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    trackPageView('Search Results');

    if (query) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(products);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {query ? `Search Results for "${query}"` : 'All Products'}
        </h1>
        <p className="text-gray-400">
          {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">
            No products found matching your search.
          </p>
          <p className="text-gray-500">Try different keywords or browse our collections</p>
        </div>
      )}
    </div>
  );
}
