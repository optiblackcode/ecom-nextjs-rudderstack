'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, collections } from '@/data/products';
import { trackPageView, trackCollectionViewed } from '@/lib/rudderstack';

export default function CollectionPage() {
  const params = useParams();
  const collectionId = params.id as string;

  const collection = collections.find((c) => c.id === collectionId);
  const collectionProducts = products.filter(
    (p) => p.collectionId === collectionId
  );

  useEffect(() => {
    if (collection) {
      trackPageView(`Collection - ${collection.name}`);
      trackCollectionViewed({
        collection_id: collection.id,
        collection_name: collection.name,
        products_count: collectionProducts.length,
      });
    }
  }, [collection, collectionProducts.length]);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Collection not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{collection.name}</h1>
        <p className="text-gray-400 text-lg">{collection.description}</p>
        <p className="text-primary mt-2">{collectionProducts.length} Products</p>
      </div>

      {/* Products Grid */}
      {collectionProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}
