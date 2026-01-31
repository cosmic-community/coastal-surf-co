// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getProductsByCategorySlug, getCategories } from '@/lib/cosmic';
import ProductGrid from '@/components/ProductGrid';

export const revalidate = 60;

// Changed: Added dynamicParams to allow dynamic rendering for paths not generated at build time
export const dynamicParams = true;

export async function generateStaticParams() {
  // Changed: Wrap in try-catch to ensure build doesn't fail if Cosmic is unavailable
  try {
    const categories = await getCategories();
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    // Return empty array to allow build to succeed - pages will be generated on-demand
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }
  
  // Changed: Use title as fallback for name
  const categoryName = category.metadata.name || category.title;
  
  return {
    title: `${categoryName} | Coastal Surf Co.`,
    description: category.metadata.description || `Shop ${category.title} at Coastal Surf Co.`,
  };
}

// Changed: Category-specific fallback images for better visual variety
const categoryFallbackImages: Record<string, string> = {
  'surfboards': 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=2000&h=600&fit=crop&auto=format,compress',
  'wetsuits': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=2000&h=600&fit=crop&auto=format,compress',
  'accessories': 'https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=2000&h=600&fit=crop&auto=format,compress',
  'default': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&h=600&fit=crop&auto=format,compress'
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
  const fallback = categorySpecificFallback ?? categoryFallbackImages['default'] ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&h=600&fit=crop&auto=format,compress';
  
  return fallback;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, products, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
    getCategories()
  ]);
  
  if (!category) {
    notFound();
  }

  // Changed: Use helper function with category slug for appropriate fallback
  const imageUrl = getOptimizedImageUrl(category.metadata.image?.imgix_url, 2000, 600, slug);

  // Changed: Use title as fallback for name
  const categoryName = category.metadata.name || category.title;

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-sand-50">
      {/* Category Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={imageUrl}
          alt={categoryName}
          className="w-full h-full object-cover"
          width={2000}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 to-ocean-900/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <nav className="flex items-center gap-2 text-sm text-ocean-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-white">{categoryName}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryName}
            </h1>
            {category.metadata.description && (
              <p className="text-ocean-100 text-lg max-w-2xl">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Other Categories */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-ocean-500 uppercase tracking-wider mb-4">
            Browse Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === slug
                    ? 'bg-ocean-600 text-white'
                    : 'bg-white text-ocean-700 hover:bg-ocean-100 border border-ocean-200'
                }`}
              >
                {/* Changed: Use title as fallback for name */}
                {cat.metadata.name || cat.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏄</div>
            <h3 className="text-xl font-semibold text-ocean-800 mb-2">
              No products yet
            </h3>
            <p className="text-ocean-600 mb-6">
              Check back soon for new arrivals in this category!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}