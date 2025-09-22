// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    }
  }

  return {
    title: post.metadata.seo_title || post.title,
    description: post.metadata.seo_description || post.metadata.excerpt || 'Read this post on our blog',
    openGraph: {
      title: post.metadata.seo_title || post.title,
      description: post.metadata.seo_description || post.metadata.excerpt,
      type: 'article',
      images: post.metadata.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Image */}
      {post.metadata.featured_image && (
        <div className="relative h-[60vh] bg-gray-900">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.metadata.categories?.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="category-badge"
                style={{ backgroundColor: category.metadata.color || '#6B7280' }}
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.metadata.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Author Info */}
          {post.metadata.author && (
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
              {post.metadata.author.metadata.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="font-semibold text-gray-900 hover:text-purple-600"
                >
                  {post.metadata.author.metadata.name}
                </Link>
                {post.metadata.author.metadata.bio && (
                  <p className="text-gray-600 text-sm mt-1">
                    {post.metadata.author.metadata.bio}
                  </p>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.metadata.content }}
        />

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  )
}