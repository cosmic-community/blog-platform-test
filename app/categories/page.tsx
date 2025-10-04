import { getCategories } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Categories - Our Blog',
  description: 'Browse our blog posts by category. Explore content across technology, business, lifestyle, travel, and more topics.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Categories Header */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
              Explore Topics
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              All Categories
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto opacity-90">
              Discover content organized by topic. From technology and business to lifestyle and travel, find what interests you most.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Browse Categories ({categories.length})
            </h2>
            <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-grow ml-8 max-w-xs"></div>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/categories/${category.slug}`}
                  className="block"
                >
                  <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer">
                    {/* Featured Image */}
                    {category.metadata.featured_image && (
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={`${category.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                          alt={category.metadata.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        />
                        <div className="absolute bottom-4 left-4">
                          <div 
                            className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
                            style={{ backgroundColor: category.metadata.color || '#6B7280' }}
                          >
                            Category
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      {/* Category Badge (if no image) */}
                      {!category.metadata.featured_image && (
                        <div className="mb-4">
                          <div 
                            className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
                            style={{ backgroundColor: category.metadata.color || '#6B7280' }}
                          >
                            Category
                          </div>
                        </div>
                      )}
                      {/* Name */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                        {category.metadata.name}
                      </h3>
                      {/* Description */}
                      {category.metadata.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {category.metadata.description}
                        </p>
                      )}
                      {/* Explore Button */}
                      <div className="pt-4 border-t border-gray-100">
                        <div
                          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-all duration-200 transform group-hover:scale-105"
                          style={{ backgroundColor: category.metadata.color || '#6B7280' }}
                        >
                          Explore {category.metadata.name} Posts
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No categories found</div>
              <p className="text-gray-400 mt-2">Check back later for organized content!</p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        {categories.length > 0 && (
          <section className="mt-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Content Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
                    <div className="text-gray-600 mt-1">Categories</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">∞</div>
                    <div className="text-gray-600 mt-1">Topics Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">📚</div>
                    <div className="text-gray-600 mt-1">Knowledge Shared</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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