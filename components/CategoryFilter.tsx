'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === null
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Posts
        </button>
        
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-4 py-2 rounded-full text-sm font-medium text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-md"
            style={{ backgroundColor: category.metadata.color || '#6B7280' }}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {category.metadata.name}
          </Link>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Explore {categories.length} categories of content
      </p>
    </div>
  )
}