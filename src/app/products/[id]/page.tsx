'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { trackPageView, trackProductViewed } from '@/lib/rudderstack';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const product = products.find((p) => p.id === productId);
  const addToCart = useStore((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      trackPageView(`Product - ${product.name}`);
      trackProductViewed({
        product_id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image_url: product.image,
        brand: 'ZILO',
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button
          onClick={() => router.push('/')}
          className="bg-primary text-dark px-6 py-2 rounded-lg font-semibold"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart({
      product,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });

    // Show success message
    alert('Product added to cart!');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 mb-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-dark px-4 py-2 rounded-full text-sm font-bold">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                -{discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-primary text-sm mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 font-semibold transition ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-dark'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Select Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-lg border-2 font-semibold transition ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-dark'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border-2 border-gray-700 hover:border-primary transition flex items-center justify-center"
              >
                −
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border-2 border-gray-700 hover:border-primary transition flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-primary text-dark py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Stock Status */}
          {product.inStock ? (
            <p className="text-green-500 text-center">✓ In Stock - Fast Delivery Available</p>
          ) : (
            <p className="text-red-500 text-center">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
