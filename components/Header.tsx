'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                Modern Blog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Categories
              </Link>
              <Link 
                href="/authors" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Authors
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden mobile-menu-container">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-purple-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                    }`}
                  />
                  <span 
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden mobile-menu-container fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Menu</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <nav className="flex flex-col p-4 space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all duration-200 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>

            <Link
              href="/categories"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all duration-200 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H5m14 8H5m6 4H5" />
              </svg>
              <span>Categories</span>
            </Link>

            <Link
              href="/authors"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all duration-200 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>Authors</span>
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all duration-200 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About</span>
            </Link>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Powered by</p>
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                <img 
                  src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
                  alt="Cosmic Logo" 
                  className="w-4 h-4"
                />
                <span>Cosmic CMS</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}