import { getProducts, getCategories } from '@/lib/cosmic';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';

export const revalidate = 60;

export const metadata = {
  title: 'All Products | Coastal Surf Co.',
  description: 'Browse our complete collection of surfboards, wetsuits, and accessories.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-sand-50">
      {/* Page Header */}
      <div className="bg-ocean-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-ocean-200 text-lg max-w-2xl">
            Premium gear for every wave. From beginner boards to pro-level equipment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <CategoryFilter categories={categories} />
        
        {/* Products Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}