import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import { getProducts, getCategories, getTestimonials } from '@/lib/cosmic';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories, testimonials] = await Promise.all([
    getProducts(),
    getCategories(),
    getTestimonials()
  ]);

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <CategoryShowcase categories={categories} />
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <Newsletter />
    </>
  );
}