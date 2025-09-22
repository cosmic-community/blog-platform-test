# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/7838e730-980c-11f0-8dcc-651091f6a7c0-photo-1555066931-4365d14bab8c-1758583977055.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js and Cosmic CMS. Features a clean design, author profiles, category filtering, and optimized SEO for professional content publishing.

## ✨ Features

- **Modern Blog Design**: Clean, responsive interface with professional typography
- **Dynamic Content**: Powered by Cosmic CMS with real-time content updates
- **Author Profiles**: Dedicated author pages with social links and bios
- **Category System**: Color-coded categories with filtering capabilities
- **Featured Posts**: Highlight important content with special styling
- **SEO Optimized**: Custom meta tags and structured content
- **Mobile-First**: Responsive design that works on all devices
- **Fast Performance**: Optimized images and efficient data fetching

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68d1da24515b6bf2aba7865b&clone_repository=68d1ddfb515b6bf2aba78681)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Headless CMS integration
- **Vercel** - Deployment and hosting platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the blog content model set up

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd modern-blog-platform
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

export async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Single Post
```typescript
export async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Post
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

## 🎨 Cosmic CMS Integration

This application integrates with your Cosmic CMS content model:

### Content Types
- **Posts**: Blog articles with content, excerpts, featured images, and SEO fields
- **Authors**: Writer profiles with bios, avatars, and social links
- **Categories**: Content organization with descriptions, colors, and featured images

### Key Features
- **Object Relationships**: Posts connect to authors and categories using object/objects metafields
- **Rich Content**: HTML content rendering with proper styling
- **Media Management**: Optimized images using Cosmic's imgix integration
- **SEO Fields**: Custom titles and descriptions for search optimization

## 🚀 Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify

1. Build the application: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

### Environment Variables

Set these variables in your deployment platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

For production deployments, obtain your keys from the Cosmic dashboard and ensure they have appropriate permissions.

<!-- README_END -->