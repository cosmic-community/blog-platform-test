import { getPosts, getFeaturedPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories()
  ])

  const featuredPost = featuredPosts[0]
  const regularPosts = posts.filter(post => !post.metadata.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Welcome to Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
              Discover insights, stories, and knowledge across technology, business, lifestyle, and more.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Post</h2>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-grow ml-8 max-w-xs"></div>
            </div>
            <FeaturedPost post={featuredPost} />
          </section>
        )}

        {/* Category Filter */}
        {categories.length > 0 && (
          <section className="mb-12">
            <CategoryFilter categories={categories} />
          </section>
        )}

        {/* Recent Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-grow ml-8 max-w-xs"></div>
          </div>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No posts found</div>
              <p className="text-gray-400 mt-2">Check back later for new content!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}