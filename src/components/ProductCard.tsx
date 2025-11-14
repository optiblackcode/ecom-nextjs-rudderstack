import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-gray rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-primary text-dark px-3 py-1 rounded-full text-xs font-bold">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-400 text-xs mb-1">{product.category}</p>
          <h3 className="font-semibold mb-2 group-hover:text-primary transition">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          {!product.inStock && (
            <p className="text-red-500 text-sm mt-2">Out of Stock</p>
          )}
        </div>
      </div>
    </Link>
  );
}
