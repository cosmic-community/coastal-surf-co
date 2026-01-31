import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=2400&h=1600&fit=crop&auto=format,compress"
          alt="Surfing lifestyle"
          className="w-full h-full object-cover"
          width={2400}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/90 via-ocean-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 bg-ocean-500/20 text-ocean-200 rounded-full text-sm font-medium mb-6 animate-fade-in">
            🌊 New Season Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Ride Your
            <span className="block text-gradient bg-gradient-to-r from-ocean-400 to-cyan-300">
              Perfect Wave
            </span>
          </h1>
          <p className="text-xl text-ocean-100 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Premium surfboards, wetsuits, and gear crafted for surfers who demand the best. 
            From beginner boards to pro-level equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-ocean-900 hover:bg-ocean-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Shop Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/categories/surfboards"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Explore Boards
            </Link>
          </div>
        </div>
      </div>

      {/* Wave Animation at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill="#fdfcfb"
            d="M0,60 C480,100 960,20 1440,60 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 hidden lg:block animate-float">
        <div className="w-20 h-20 bg-ocean-400/20 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-32 h-32 bg-cyan-400/20 rounded-full blur-xl" />
      </div>
    </section>
  );
}