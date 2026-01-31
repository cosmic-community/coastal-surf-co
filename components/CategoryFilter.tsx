import Link from 'next/link';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-ocean-500 uppercase tracking-wider mb-4">
        Filter by Category
      </h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/products"
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            !activeSlug
              ? 'bg-ocean-600 text-white shadow-lg shadow-ocean-600/30'
              : 'bg-white text-ocean-700 hover:bg-ocean-100 border border-ocean-200'
          }`}
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeSlug === category.slug
                ? 'bg-ocean-600 text-white shadow-lg shadow-ocean-600/30'
                : 'bg-white text-ocean-700 hover:bg-ocean-100 border border-ocean-200'
            }`}
          >
            {/* Changed: Use title as fallback for name */}
            {category.metadata.name || category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}