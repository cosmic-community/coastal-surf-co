// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getProductBySlug, getProducts, getCategories } from '@/lib/cosmic';

export const revalidate = 60;

// Changed: Added dynamicParams to allow dynamic rendering for paths not generated at build time
export const dynamicParams = true;

export async function generateStaticParams() {
  // Changed: Wrap in try-catch to ensure build doesn't fail if Cosmic is unavailable
  try {
    const products = await getProducts();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    // Return empty array to allow build to succeed - pages will be generated on-demand
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.title} | Coastal Surf Co.`,
    description: product.metadata.description?.slice(0, 160) || `Shop the ${product.title} at Coastal Surf Co.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, products, categories] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getCategories()
  ]);
  
  if (!product) {
    notFound();
  }

  // Get category info
  const categorySlug = typeof product.metadata.category === 'string' 
    ? product.metadata.category 
    : product.metadata.category?.slug;
  
  const category = categories.find(c => c.slug === categorySlug);

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => {
      const pCatSlug = typeof p.metadata.category === 'string' 
        ? p.metadata.category 
        : p.metadata.category?.slug;
      return pCatSlug === categorySlug && p.slug !== product.slug;
    })
    .slice(0, 3);

  const imageUrl = product.metadata.featured_image?.imgix_url || 
    'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=800&fit=crop&auto=format,compress';

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-sand-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ocean-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-ocean-600 hover:text-ocean-800 transition-colors">
              Home
            </Link>
            <span className="text-ocean-300">/</span>
            <Link href="/products" className="text-ocean-600 hover:text-ocean-800 transition-colors">
              Products
            </Link>
            {category && (
              <>
                <span className="text-ocean-300">/</span>
                <Link 
                  href={`/categories/${category.slug}`} 
                  className="text-ocean-600 hover:text-ocean-800 transition-colors"
                >
                  {category.metadata.name || category.title}
                </Link>
              </>
            )}
            <span className="text-ocean-300">/</span>
            <span className="text-ocean-800 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={`${imageUrl}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
            {category && (
              <div className="absolute top-4 left-4">
                <span className="bg-ocean-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {category.metadata.name || category.title}
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-ocean-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-ocean-600">
                ${product.metadata.price.toFixed(2)}
              </span>
              <span className="text-ocean-400 text-lg">USD</span>
            </div>

            {/* Description */}
            {product.metadata.description && (
              <div className="prose prose-ocean max-w-none mb-8">
                <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Save for Later
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-ocean-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-ocean-700">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="text-ocean-700">Easy Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-ocean-700">Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-ocean-700">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-ocean-900 mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md card-hover"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`${relatedProduct.metadata.featured_image?.imgix_url || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f'}?w=600&h=600&fit=crop&auto=format,compress`}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-ocean-600 font-bold mt-1">
                      ${relatedProduct.metadata.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}