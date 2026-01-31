'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ocean-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏄</span>
            </div>
            <span className="text-xl font-bold text-ocean-900">
              Coastal<span className="text-ocean-500">Surf</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/categories/surfboards"
              className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
            >
              Surfboards
            </Link>
            <Link
              href="/categories/wetsuits"
              className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
            >
              Wetsuits
            </Link>
            <Link
              href="/categories/accessories"
              className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
            >
              Accessories
            </Link>
          </nav>

          {/* Cart & Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-ocean-700 hover:text-ocean-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-ocean-700 hover:text-ocean-500 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-ocean-100 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
              >
                Shop All
              </Link>
              <Link
                href="/categories/surfboards"
                onClick={() => setIsMenuOpen(false)}
                className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
              >
                Surfboards
              </Link>
              <Link
                href="/categories/wetsuits"
                onClick={() => setIsMenuOpen(false)}
                className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
              >
                Wetsuits
              </Link>
              <Link
                href="/categories/accessories"
                onClick={() => setIsMenuOpen(false)}
                className="text-ocean-700 hover:text-ocean-500 font-medium transition-colors"
              >
                Accessories
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}