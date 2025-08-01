'use client';

import { Search, Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { MarketplaceStats } from '@/types/Marketplace';

type MarketplaceHeroProps = {
  stats?: MarketplaceStats;
  onSearch?: (query: string) => void;
};

export function MarketplaceHero({
  stats,
  onSearch,
}: MarketplaceHeroProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* ZENO Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-6 py-3 dark:border-purple-800 dark:bg-purple-900/20">
              <Sparkles className="size-5 animate-spin text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-300">∞ Welcome to ZENO</span>
            </div>

            {/* Main Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              <span className="block bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                ZENO
              </span>
              <span className="block text-gray-900 dark:text-white">
                Marketplace
              </span>
            </h1>

            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 lg:text-xl">
              ∞ Discover infinite possibilities in our advanced AI marketplace.
              Where every creator explores the boundaries of AI innovation and finds exactly what they need.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-12">
              <div className="relative mx-auto max-w-2xl">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="∞ Search ZENO for AI videos, music, tools..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="h-14 border-purple-200 pl-12 pr-32 text-lg focus:border-purple-400 focus:ring-purple-400"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Search ZENO
                </Button>
              </div>
            </form>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-lg border border-purple-200 bg-white/70 p-4 backdrop-blur-sm dark:border-purple-800 dark:bg-gray-800/70">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalProducts.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">∞ AI Products</div>
                </div>
                <div className="rounded-lg border border-blue-200 bg-white/70 p-4 backdrop-blur-sm dark:border-blue-800 dark:bg-gray-800/70">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalSellers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">∞ ZENO Creators</div>
                </div>
                <div className="rounded-lg border border-indigo-200 bg-white/70 p-4 backdrop-blur-sm dark:border-indigo-800 dark:bg-gray-800/70">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalSales.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">⬇️ Downloads</div>
                </div>
                <div className="rounded-lg border border-purple-200 bg-white/70 p-4 backdrop-blur-sm dark:border-purple-800 dark:bg-gray-800/70">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.featuredProducts.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">⭐ Featured</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sci-fi Background decoration */}
        <div className="absolute -right-12 -top-12 size-64 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 size-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/5 blur-2xl" />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-50/50 via-blue-50/50 to-indigo-50/50 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="group text-center">
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-blue-100 transition-transform duration-300 group-hover:scale-110 dark:border-purple-800 dark:from-purple-900/20 dark:to-blue-900/20">
                <TrendingUp className="size-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">🔥 Trending in ZENO</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Discover the most popular AI creations exploring infinite possibilities
              </p>
              <Link href="/marketplace?sortBy=downloads">
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20">
                  View Trending
                </Button>
              </Link>
            </div>

            <div className="group text-center">
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-indigo-100 transition-transform duration-300 group-hover:scale-110 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
                <Star className="size-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">⭐ Top Rated</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Explore the highest-rated products from our ZENO community
              </p>
              <Link href="/marketplace?sortBy=rating">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20">
                  View Top Rated
                </Button>
              </Link>
            </div>

            <div className="group text-center">
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full border-2 border-indigo-200 bg-gradient-to-br from-indigo-100 to-purple-100 transition-transform duration-300 group-hover:scale-110 dark:border-indigo-800 dark:from-indigo-900/20 dark:to-purple-900/20">
                <Users className="size-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">∞ Become a ZENO Creator</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Join ZENO and start exploring infinite possibilities with your AI creations
              </p>
              <Link href="/dashboard/seller/onboarding">
                <Button className="border-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                  Join ZENO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
