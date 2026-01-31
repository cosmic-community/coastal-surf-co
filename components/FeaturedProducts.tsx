import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Sort by price (highest first) and take top 4
  const featuredProducts = [...products]
    .sort((a, b) => b.metadata.price - a.metadata.price)
    .slice(0, 4);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-ocean-500 font-semibold text-sm uppercase tracking-wider">
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 mt-2 mb-4">
            Top Picks This Season
          </h2>
          <p className="text-ocean-600 max-w-2xl mx-auto">
            Hand-selected gear loved by surfers around the world. 
            Quality equipment that performs when it counts.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}