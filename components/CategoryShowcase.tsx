import Link from 'next/link';
import { Category } from '@/types';

interface CategoryShowcaseProps {
  categories: Category[];
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
            const imageUrl = category.metadata.image?.imgix_url || 
              'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop&auto=format,compress';
            
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
                  src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
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