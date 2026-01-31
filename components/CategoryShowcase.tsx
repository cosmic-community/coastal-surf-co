import Link from 'next/link';
import { Category } from '@/types';

interface CategoryShowcaseProps {
  categories: Category[];
}

// Changed: Category-specific fallback images for better visual variety
const categoryFallbackImages: Record<string, string> = {
  'surfboards': 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&h=600&fit=crop&auto=format,compress',
  'wetsuits': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&auto=format,compress',
  'accessories': 'https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=800&h=600&fit=crop&auto=format,compress',
  'default': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&auto=format,compress'
};

// Changed: Fixed return type to always return string by ensuring fallback is never undefined
function getOptimizedImageUrl(imageUrl: string | undefined, width: number, height: number, categorySlug?: string): string {
  // If we have a valid image URL from Cosmic, use it
  if (imageUrl) {
    const cleanUrl = imageUrl.split('?')[0];
    return `${cleanUrl}?w=${width}&h=${height}&fit=crop&auto=format,compress`;
  }
  
  // Changed: Use nullish coalescing to ensure we always have a string fallback
  // First try category-specific, then fall back to default (which always exists)
  const categorySpecificFallback = categorySlug ? categoryFallbackImages[categorySlug] : undefined;
  const fallback = categorySpecificFallback ?? categoryFallbackImages['default'] ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&auto=format,compress';
  
  return fallback;
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-ocean-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-ocean-500 font-semibold text-sm uppercase tracking-wider">
            Browse By Category
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 mt-2">
            Find Your Gear
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            // Changed: Use helper function with category slug for appropriate fallback
            const imageUrl = getOptimizedImageUrl(category.metadata.image?.imgix_url, 800, 600, category.slug);
            
            // Changed: Use title as fallback for name
            const categoryName = category.metadata.name || category.title;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <img
                  src={imageUrl}
                  alt={categoryName}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/40 to-transparent group-hover:from-ocean-900/95 transition-colors" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {categoryName}
                  </h3>
                  {category.metadata.description && (
                    <p className="text-ocean-200 text-sm line-clamp-2 mb-4">
                      {category.metadata.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-ocean-300 transition-colors">
                    Shop Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}