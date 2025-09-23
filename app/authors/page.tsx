import { getAuthors } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Authors - Our Blog',
  description: 'Meet our talented team of writers and content creators who bring you insights across technology, business, lifestyle, and more.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Authors Header */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
              Meet Our Team
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Authors
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto opacity-90">
              Meet the talented writers and creators behind our content. Each brings unique expertise and perspective to deliver valuable insights.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Authors Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              All Authors ({authors.length})
            </h2>
            <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-grow ml-8 max-w-xs"></div>
          </div>
          
          {authors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authors.map((author) => (
                <article key={author.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                  <div className="p-6 text-center">
                    {/* Avatar */}
                    {author.metadata.avatar && (
                      <div className="w-24 h-24 mx-auto mb-4 relative">
                        <img
                          src={`${author.metadata.avatar.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                          alt={author.metadata.name}
                          className="w-full h-full rounded-full object-cover border-4 border-purple-100 group-hover:border-purple-200 transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* Name */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link 
                        href={`/authors/${author.slug}`}
                        className="hover:text-purple-600 transition-colors duration-200"
                      >
                        {author.metadata.name}
                      </Link>
                    </h3>

                    {/* Bio */}
                    {author.metadata.bio && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {author.metadata.bio}
                      </p>
                    )}

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                      {author.metadata.twitter && (
                        <a
                          href={`https://twitter.com/${author.metadata.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      )}
                      {author.metadata.linkedin && (
                        <a
                          href={author.metadata.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* View Profile Button */}
                    <Link
                      href={`/authors/${author.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-200 transform group-hover:scale-105"
                    >
                      View Profile
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No authors found</div>
              <p className="text-gray-400 mt-2">Check back later for author profiles!</p>
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