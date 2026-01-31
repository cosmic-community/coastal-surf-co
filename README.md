# 🏄 Coastal Surf Co.

![Coastal Surf Co.](https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=400&fit=crop&auto=format,compress)

A beautiful, modern e-commerce surf shop built with Next.js 16 and Cosmic CMS. Features a stunning ocean-inspired design, smooth animations, product catalog with category filtering, and detailed product pages.

## Features

- 🏠 **Hero Landing** - Full-width hero with stunning surf imagery
- 🛍️ **Product Catalog** - Browse and filter products by category
- 📦 **Product Details** - Rich markdown descriptions with pricing
- 🏷️ **Category Pages** - Dedicated pages for each product category
- ⭐ **Testimonials** - Customer reviews with star ratings
- 🌊 **Ocean Design** - Beautiful blue color palette with wave animations
- 📱 **Responsive** - Mobile-first design for all devices
- ⚡ **Fast** - Server-side rendering with Next.js 16
- 🎨 **Tailwind CSS** - Modern styling with custom theme

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=697e45fd7a65a1cabaf8e11c&clone_repository=697e49ed7a65a1cabaf8e143)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: A website that sells surfboards and accessories. Products, categories, and testimonials"

### Code Generation Prompt

> "Surprise me"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React Markdown](https://github.com/remarkjs/react-markdown) - Render markdown content

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your surf shop content

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your surf shop!

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching by Category

```typescript
const { objects: surfboards } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types from your Cosmic bucket:

- **Products** - Surfboards, wetsuits, and accessories with prices and descriptions
- **Categories** - Product categories for filtering
- **Testimonials** - Customer reviews with ratings

## Deployment

Deploy easily to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to add your environment variables in your deployment platform.
<!-- README_END -->