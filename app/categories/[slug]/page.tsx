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
  
  return {
    title: `${category.metadata.name || category.title} | Coastal Surf Co.`,
    description: category.metadata.description || `Shop ${category.title} at Coastal Surf Co.`,
  };
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

  const imageUrl = category.metadata.image?.imgix_url || 
    'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=2000&auto=format,compress';

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-sand-50">
      {/* Category Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={`${imageUrl}?w=2000&h=600&fit=crop&auto=format,compress`}
          alt={category.metadata.name || category.title}
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
              <span className="text-white">{category.metadata.name || category.title}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.metadata.name || category.title}
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