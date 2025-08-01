'use client';

import { Search, TrendingUp, Star, Users, Download } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { MarketplaceStats, ProductCategory } from '@/types/Marketplace';

interface MarketplaceHeroProps {
  stats?: MarketplaceStats;
  onSearch?: (query: string) => void;
  featuredCategories?: { value: ProductCategory; label: string; icon: string }[];
}

const defaultCategories = [
  { value: 'ai_video' as ProductCategory, label: 'AI Videos', icon: '🎬' },
  { value: 'ai_music' as ProductCategory, label: 'AI Music', icon: '🎵' },
  { value: 'ai_image' as ProductCategory, label: 'AI Images', icon: '🖼️' },
  { value: 'ai_tool' as ProductCategory, label: 'AI Tools', icon: '🛠️' },
];

export function MarketplaceHero({ 
  stats, 
  onSearch, 
  featuredCategories = defaultCategories 
}: MarketplaceHeroProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/3 to-secondary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Main Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Creations
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
              Explore thousands of AI-generated videos, music, images, books, and tools 
              created by talented artists and developers worldwide.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-12">
              <div className="relative mx-auto max-w-2xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for AI videos, music, tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 pr-32 text-lg"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 h-10 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{stats.totalProducts.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">AI Products</div>
                </div>
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{stats.totalSellers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Creators</div>
                </div>
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{stats.totalSales.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{stats.featuredProducts.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Featured</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Explore Categories</h2>
          <p className="text-muted-foreground">
            Find the perfect AI-generated content for your next project
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.value}
              href={`/marketplace?category=${category.value}`}
              className="group"
            >
              <div className="rounded-lg border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 text-4xl">{category.icon}</div>
                <h3 className="mb-2 font-semibold group-hover:text-primary">
                  {category.label}
                </h3>
                {stats?.categoryCounts?.[category.value] && (
                  <p className="text-sm text-muted-foreground">
                    {stats.categoryCounts[category.value].toLocaleString()} items
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Trending Now</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Discover the most popular AI creations this week
              </p>
              <Link href="/marketplace?sortBy=downloads">
                <Button variant="outline">View Trending</Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Top Rated</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Explore the highest-rated products from our community
              </p>
              <Link href="/marketplace?sortBy=rating">
                <Button variant="outline">View Top Rated</Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Become a Seller</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Share your AI creations and earn from your work
              </p>
              <Link href="/dashboard/seller/onboarding">
                <Button>Start Selling</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}