import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Modern Blog Platform',
  description: 'Learn more about our modern blog platform built with Next.js and Cosmic CMS',
  openGraph: {
    title: 'About - Modern Blog Platform',
    description: 'Learn more about our modern blog platform built with Next.js and Cosmic CMS',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Our Blog
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Discover the story behind our modern blog platform
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-8">
                We're passionate about sharing knowledge and insights across technology, 
                business, lifestyle, and more. Our modern blog platform is built with 
                cutting-edge technologies to provide the best reading experience.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Next.js 14 with App Router</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Content Management</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Cosmic CMS</li>
                    <li>• Dynamic Content</li>
                    <li>• SEO Optimized</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Features</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Modern, responsive design',
                  'Author profiles & bios',
                  'Category filtering',
                  'Featured posts',
                  'SEO optimization',
                  'Mobile-first approach'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}