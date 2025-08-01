'use client';

import { Calendar, Clock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MarketplaceGrid } from '@/features/marketplace/MarketplaceGrid';
import type { ProductCategory, ProductWithDetails } from '@/types/Marketplace';

// Custom type to fix category field type issue
type CategoryProduct = Omit<ProductWithDetails, 'category'> & {
  category: ProductCategory;
};

// Mock new products - In a real app, this would come from your API
const newProducts: CategoryProduct[] = [
  {
    id: 2,
    sellerId: 'user_2',
    title: 'Ambient Space Music - AI Composed Soundtrack',
    description: 'A beautiful ambient space music track composed entirely by AI. Perfect for meditation, relaxation, or background music for sci-fi projects.',
    shortDescription: 'Ambient AI-composed space music for relaxation',
    slug: 'ambient-space-music',
    category: 'ai_music',
    price: '12.99',
    licenseType: 'personal',
    tags: '["ambient", "space", "relaxation", "meditation", "sci-fi"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=2',
    duration: 300,
    aiModel: 'AIVA',
    status: 'published',
    isActive: true,
    isFeatured: false,
    downloads: 234,
    views: 987,
    favorites: 45,
    rating: '4.6',
    reviewCount: 12,
    metadata: '{}',
    updatedAt: new Date('2024-01-14'),
    createdAt: new Date('2024-01-14'),
    seller: {
      id: 2,
      userId: 'user_2',
      displayName: 'SoundWave AI',
      bio: 'AI music producer creating ambient and electronic compositions',
      avatar: 'https://picsum.photos/100/100?random=2',
      isSeller: true,
      sellerVerified: true,
      totalSales: 89,
      rating: '4.7',
      totalReviews: 34,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    isFavorited: false,
  },
  {
    id: 4,
    sellerId: 'user_4',
    title: 'AI Portrait Generator - Professional Headshots',
    description: 'Generate professional headshots and portraits using advanced AI technology. Perfect for LinkedIn profiles, business cards, and professional portfolios.',
    shortDescription: 'AI-generated professional portraits and headshots',
    slug: 'ai-portrait-generator',
    category: 'ai_image',
    price: '19.99',
    licenseType: 'commercial',
    tags: '["portrait", "headshot", "professional", "business", "linkedin"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=4',
    aiModel: 'Midjourney V6',
    status: 'published',
    isActive: true,
    isFeatured: false,
    downloads: 156,
    views: 789,
    favorites: 34,
    rating: '4.7',
    reviewCount: 15,
    metadata: '{}',
    updatedAt: new Date('2024-01-12'),
    createdAt: new Date('2024-01-12'),
    seller: {
      id: 4,
      userId: 'user_4',
      displayName: 'PortraitPro AI',
      bio: 'Specializing in AI-generated professional imagery',
      avatar: 'https://picsum.photos/100/100?random=4',
      isSeller: true,
      sellerVerified: true,
      totalSales: 78,
      rating: '4.8',
      totalReviews: 25,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    isFavorited: false,
  },
  {
    id: 5,
    sellerId: 'user_5',
    title: 'AI Sci-Fi Novel - The Digital Frontier',
    description: 'A complete science fiction novel written entirely by AI, exploring themes of consciousness, technology, and humanity in the digital age.',
    shortDescription: 'AI-written sci-fi novel about digital consciousness',
    slug: 'ai-scifi-novel-digital-frontier',
    category: 'ai_book',
    price: '9.99',
    licenseType: 'personal',
    tags: '["novel", "science fiction", "ai writing", "digital", "consciousness"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=5',
    aiModel: 'GPT-4',
    status: 'published',
    isActive: true,
    isFeatured: false,
    downloads: 67,
    views: 234,
    favorites: 12,
    rating: '4.5',
    reviewCount: 8,
    metadata: '{}',
    updatedAt: new Date('2024-01-11'),
    createdAt: new Date('2024-01-11'),
    seller: {
      id: 5,
      userId: 'user_5',
      displayName: 'AI Author',
      bio: 'Creating compelling narratives through artificial intelligence',
      avatar: 'https://picsum.photos/100/100?random=5',
      isSeller: true,
      sellerVerified: true,
      totalSales: 23,
      rating: '4.6',
      totalReviews: 12,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    isFavorited: false,
  },
];

export default function NewArrivalsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(true);

  useEffect(() => {
    // Simulate API call - sort by creation date (newest first)
    setTimeout(() => {
      const sortedProducts = [...newProducts].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setProducts(sortedProducts);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddToFavorites = async (productId: number) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, isFavorited: !product.isFavorited }
        : product,
    ));
  };

  const handlePreview = (product: ProductWithDetails) => {
    router.push(`/marketplace/products/${product.slug}`);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    }
    if (diffInDays === 1) {
      return 'Yesterday';
    }
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Sparkles className="size-8 text-green-500" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                New Arrivals
              </h1>
              <Clock className="size-8 text-blue-500" />
            </div>
          </div>

          <p className="mx-auto mb-6 max-w-3xl text-center text-xl text-gray-600 dark:text-gray-400">
            Fresh AI-generated content just added to our marketplace. Be the first to discover the latest innovations.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>Added This Week</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-green-500" />
              <span>Fresh Content</span>
            </div>
            <div className="font-medium text-primary">
              {products.length}
              {' '}
              new items
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-lg border border-green-200 bg-gradient-to-r from-green-100 to-blue-100 p-6 dark:border-green-800 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="mb-2 flex items-center gap-3">
            <Clock className="size-5 text-green-600" />
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">
              Latest Additions to Our Marketplace
            </h2>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Stay ahead of the curve with our newest AI-generated content. These products have been added within the last 7 days
            and showcase the latest trends and innovations in AI creativity.
          </p>
        </div>

        {/* Time-based sections */}
        <div className="space-y-8">
          {products.length > 0 && (
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800">
                  <Calendar className="size-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recently Added
                  </span>
                </div>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Products with date badges */}
              <div className="space-y-6">
                {products.map(product => (
                  <div key={product.id} className="relative">
                    <div className="absolute -right-2 -top-2 z-10">
                      <div className="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        {formatDate(product.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <MarketplaceGrid
          products={products as ProductWithDetails[]}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onAddToFavorites={handleAddToFavorites}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
}
