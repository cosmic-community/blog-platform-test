import Link from 'next/link'
import type { Post } from '@/types'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Content */}
        <div className="p-8 lg:p-12 text-white flex flex-col justify-center">
          <div className="space-y-6">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-100">Featured Post</span>
            </div>

            {/* Categories */}
            {post.metadata.categories && post.metadata.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.metadata.categories.slice(0, 2).map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-200"
                  >
                    {category.metadata.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              <Link href={`/posts/${post.slug}`} className="hover:text-purple-100 transition-colors duration-200">
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            {post.metadata.excerpt && (
              <p className="text-lg text-purple-100 leading-relaxed">
                {post.metadata.excerpt}
              </p>
            )}

            {/* Author and CTA */}
            <div className="flex items-center justify-between pt-4">
              {post.metadata.author && (
                <div className="flex items-center gap-3">
                  {post.metadata.author.metadata.avatar && (
                    <img
                      src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                  )}
                  <div>
                    <Link
                      href={`/authors/${post.metadata.author.slug}`}
                      className="font-medium hover:text-purple-100 transition-colors duration-200"
                    >
                      {post.metadata.author.metadata.name}
                    </Link>
                  </div>
                </div>
              )}

              <Link
                href={`/posts/${post.slug}`}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105"
              >
                Read Article
              </Link>
            </div>
          </div>
        </div>

        {/* Image */}
        {post.metadata.featured_image && (
          <div className="relative lg:order-first">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent lg:from-transparent lg:to-purple-600/20"></div>
          </div>
        )}
      </div>
    </article>
  )
}