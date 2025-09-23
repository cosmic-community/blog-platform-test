import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.'
    }
  }

  return {
    title: `${author.metadata.name} - Author`,
    description: author.metadata.bio || `Posts by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const [author, posts] = await Promise.all([
    getAuthor(slug),
    getAuthor(slug).then(author => author ? getPostsByAuthor(author.id) : [])
  ])

  if (!author) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Author Header */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Author
            </div>
            
            {/* Author Avatar */}
            {author.metadata.avatar && (
              <div className="mb-6">
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto border-4 border-white/20 shadow-xl"
                />
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {author.metadata.name}
            </h1>
            
            {author.metadata.bio && (
              <p className="text-xl leading-relaxed max-w-2xl mx-auto opacity-90 mb-8">
                {author.metadata.bio}
              </p>
            )}

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {author.metadata.twitter && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Twitter
                </a>
              )}
              {author.metadata.linkedin && (
                <a
                  href={author.metadata.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  LinkedIn
                </a>
              )}
              {author.metadata.email && (
                <a
                  href={`mailto:${author.metadata.email}`}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Posts by Author */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Posts by {author.metadata.name} ({posts.length})
            </h2>
            <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-grow ml-8 max-w-xs"></div>
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
              <p className="text-gray-400 mt-2">This author hasn't published any posts yet.</p>
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