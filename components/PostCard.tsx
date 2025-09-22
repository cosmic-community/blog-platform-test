import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Featured Image */}
      {post.metadata.featured_image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        {/* Categories */}
        {post.metadata.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.metadata.categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="category-badge text-xs"
                style={{ backgroundColor: category.metadata.color || '#6B7280' }}
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
          <Link href={`/posts/${post.slug}`} className="block">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author Info */}
        {post.metadata.author && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            {post.metadata.author.metadata.avatar && (
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link
                href={`/authors/${post.metadata.author.slug}`}
                className="text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors duration-200"
              >
                {post.metadata.author.metadata.name}
              </Link>
            </div>
            <Link
              href={`/posts/${post.slug}`}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Read more →
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}