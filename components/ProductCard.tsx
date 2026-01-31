'use client';

import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

// Changed: Helper function to properly append imgix parameters
function getOptimizedImageUrl(imageUrl: string | undefined, width: number, height: number): string {
  const fallbackImage = 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15';
  const baseUrl = imageUrl || fallbackImage;
  
  // Remove any existing query parameters and add fresh ones
  const cleanUrl = baseUrl.split('?')[0];
  return `${cleanUrl}?w=${width}&h=${height}&fit=crop&auto=format,compress`;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Changed: Use helper function to get properly formatted image URL
  const imageUrl = getOptimizedImageUrl(product.metadata.image?.imgix_url, 800, 800);

  // Changed: Added fallback for potentially undefined price
  const price = product.metadata.price ?? 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product.title);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover block"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ocean-50">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          width={400}
          height={400}
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-ocean-900/0 group-hover:bg-ocean-900/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-ocean-900 px-4 py-2 rounded-lg font-medium text-sm">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors text-lg mb-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-ocean-600">
            ${price.toFixed(2)}
          </span>
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-ocean-100 hover:bg-ocean-600 text-ocean-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}