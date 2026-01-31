import { Testimonial } from '@/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null;
  }

  // Changed: Updated to accept number and handle undefined
  const renderStars = (rating: number | undefined) => {
    const ratingNum = rating ?? 5;
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < ratingNum ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-ocean-500 font-semibold text-sm uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 mt-2 mb-4">
            What Surfers Say
          </h2>
          <p className="text-ocean-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear from surfers who trust Coastal Surf Co.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            // Changed: Support both naming conventions with fallbacks
            const quote = testimonial.metadata.quote || testimonial.metadata.content || '';
            const customerName = testimonial.metadata.customer_name || testimonial.metadata.author_name || 'Customer';
            const photo = testimonial.metadata.photo || testimonial.metadata.author_image;
            
            return (
              <div
                key={testimonial.id}
                className="bg-ocean-50 rounded-2xl p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.metadata.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-ocean-800 mb-6">
                  &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {photo ? (
                    <img
                      src={`${photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                      alt={customerName}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-ocean-200 flex items-center justify-center">
                      <span className="text-ocean-600 font-semibold text-lg">
                        {customerName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-ocean-900">
                      {customerName}
                    </p>
                    <p className="text-sm text-ocean-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}