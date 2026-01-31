// Type guard helper for checking if an error has a status property
export function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  );
}

// Cosmic file/image type
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Product type matching Cosmic object structure
export interface Product {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    price?: number;
    category?: string;
    image?: CosmicFile;
    images?: CosmicFile[];
    featured?: boolean;
  };
}

// Category type matching Cosmic object structure
// Changed: Added name property to metadata to match usage in components
export interface Category {
  id: string;
  title: string;
  slug: string;
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicFile;
  };
}

// Testimonial type matching Cosmic object structure
// Changed: Updated property names to match actual usage in components
export interface Testimonial {
  id: string;
  title: string;
  slug: string;
  metadata: {
    content?: string;
    quote?: string;
    author_name?: string;
    customer_name?: string;
    author_title?: string;
    author_image?: CosmicFile;
    photo?: CosmicFile;
    rating?: number;
  };
}