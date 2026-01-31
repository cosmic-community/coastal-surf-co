'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic here
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-ocean-600 to-ocean-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q25 0, 50 10 T100 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-ocean-200 font-medium text-sm uppercase tracking-wider">
          Stay Updated
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Join the Crew
        </h2>
        <p className="text-ocean-100 mb-8 max-w-2xl mx-auto">
          Get exclusive access to new arrivals, surf tips, and member-only deals. 
          No spam, just good vibes.
        </p>

        {isSubmitted ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in">
            <div className="text-5xl mb-4">🤙</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              You&apos;re in!
            </h3>
            <p className="text-ocean-200">
              Check your inbox for a welcome email. See you in the water!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-ocean-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-ocean-700 hover:bg-ocean-50 rounded-xl font-semibold transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-ocean-300 text-sm mt-6">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}