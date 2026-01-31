// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price: number;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: string | Category;
  };
}

// Testimonial type with select-dropdown rating
export type TestimonialRating = '1' | '2' | '3' | '4' | '5';

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    customer_name: string;
    quote: string;
    rating: TestimonialRating;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Helper function to check if error has status
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}