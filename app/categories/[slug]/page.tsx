// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }

  return {
    title: `${category.metadata.name} - Category`,
    description: category.metadata.description || `Browse posts in ${category.metadata.name}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, posts] = await Promise.all([
    getCategory(slug),
    getCategory(slug).then(category => category ? getPostsByCategory(category.id) : [])
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <section 
        className="text-white py-20 relative overflow-hidden"
        style={{ 
          backgroundColor: category.metadata.color || '#6B7280',
          backgroundImage: category.metadata.featured_image 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${category.metadata.featured_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress)`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div 
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              Category
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.metadata.name}
            </h1>
            {category.metadata.description && (
              <p className="text-xl leading-relaxed max-w-2xl mx-auto opacity-90">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Posts in Category */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Posts in {category.metadata.name} ({posts.length})
            </h2>
            <div className="h-1 rounded-full flex-grow ml-8 max-w-xs" style={{ backgroundColor: category.metadata.color || '#6B7280' }}></div>
          </div>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No posts found</div>
              <p className="text-gray-400 mt-2">There are no posts in this category yet.</p>
            </div>
          )}
        </section>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}