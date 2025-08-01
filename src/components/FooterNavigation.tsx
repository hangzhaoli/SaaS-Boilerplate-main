'use client';

import Link from 'next/link';

export function FooterNavigation() {
  const footerSections = [
    {
      title: 'Explore AI Products',
      links: [
        { label: 'AI Videos', href: '/marketplace?category=ai_video' },
        { label: 'AI Music', href: '/marketplace?category=ai_music' },
        { label: 'AI Images', href: '/marketplace?category=ai_image' },
        { label: 'AI Tools', href: '/marketplace?category=ai_tool' },
        { label: 'AI Books', href: '/marketplace?category=ai_book' },
        { label: 'AI Voice', href: '/marketplace?category=ai_voice' },
      ],
    },
    {
      title: 'Create & Sell',
      links: [
        { label: 'Become a Seller', href: '/seller/register' },
        { label: 'Seller Dashboard', href: '/dashboard/seller' },
        { label: 'Upload Products', href: '/dashboard/products/new' },
        { label: 'Seller Guidelines', href: '/help/seller-guidelines' },
        { label: 'Commission Rates', href: '/help/commission' },
        { label: 'Seller Resources', href: '/help/seller-resources' },
      ],
    },
    {
      title: 'Account & Support',
      links: [
        { label: 'Your Account', href: '/dashboard' },
        { label: 'Your Orders', href: '/dashboard/orders' },
        { label: 'Your Favorites', href: '/dashboard/favorites' },
        { label: 'Download History', href: '/dashboard/downloads' },
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Support', href: '/support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Subtle AI-themed background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-10 top-10 size-32 rounded-full bg-purple-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 size-40 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/2 size-24 rounded-full bg-pink-500 blur-2xl"></div>
      </div>

      {/* Back to top button */}
      <div className="cursor-pointer border-b border-purple-600/30 bg-gradient-to-r from-purple-800 to-purple-700 transition-all duration-300 hover:from-purple-700 hover:to-purple-600">
        <div className="container relative z-10 mx-auto p-4 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-medium text-purple-100 transition-colors hover:text-white"
          >
            ↑ Back to top
          </button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-6">
              <h3 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-lg font-bold text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="block py-1 text-sm text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-purple-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-purple-700/50 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-sm">
        <div className="container relative z-10 mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            {/* ZENO Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
                  <span className="text-lg font-bold text-white">∞</span>
                </div>
                <div className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
                  ZENO
                </div>
                <div className="text-xs font-medium text-purple-300">
                  Infinite Possibilities in AI Creation
                </div>
              </div>
            </div>

            {/* Language and Country selector */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 rounded-lg border border-purple-600/50 bg-purple-800/50 px-4 py-2 backdrop-blur-sm transition-all hover:bg-purple-700/50">
                <span className="text-sm">🌐</span>
                <span className="text-sm text-purple-100">English</span>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-purple-600/50 bg-purple-800/50 px-4 py-2 backdrop-blur-sm transition-all hover:bg-purple-700/50">
                <span className="text-sm">🇺🇸</span>
                <span className="text-sm text-purple-100">United States</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-purple-700/30 pt-6 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2024 ZENO. All rights reserved. |
              <span className="ml-1 text-purple-300">Empowering creators with infinite possibilities</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
