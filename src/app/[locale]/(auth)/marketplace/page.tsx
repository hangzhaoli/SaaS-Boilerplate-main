'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { CategoryCards } from '@/features/marketplace/CategoryCards';
import { MarketplaceGrid } from '@/features/marketplace/MarketplaceGrid';
import { MarketplaceHero } from '@/features/marketplace/MarketplaceHero';
import type { MarketplaceStats, ProductWithDetails } from '@/types/Marketplace';

// Mock data - In a real app, this would come from your API
const mockStats: MarketplaceStats = {
  totalProducts: 12547,
  totalSellers: 3421,
  totalSales: 89234,
  featuredProducts: 156,
  categoryCounts: {
    ai_video: 3245,
    ai_music: 2876,
    ai_image: 4321,
    ai_book: 987,
    ai_tool: 876,
    ai_voice: 542,
  },
};

const mockProducts: ProductWithDetails[] = [
  {
    id: 1,
    sellerId: 'user_1',
    title: 'Epic Fantasy Battle Scene - AI Generated 4K Video',
    description: 'A stunning 4K AI-generated video featuring an epic fantasy battle with dragons, knights, and magical effects. Perfect for game trailers, presentations, or creative projects.',
    shortDescription: 'Epic 4K fantasy battle scene with dragons and magical effects',
    slug: 'epic-fantasy-battle-scene',
    category: 'ai_video',
    categoryId: 1,
    price: '29.99',
    originalPrice: '39.99',
    licenseType: 'commercial',
    tags: '["fantasy", "battle", "dragons", "4k", "cinematic"]',
    previewUrl: 'https://example.com/preview.mp4',
    thumbnailUrl: 'https://picsum.photos/800/450?random=1',
    downloadUrl: 'https://example.com/download/1',
    fileSize: 2147483648, // 2GB
    duration: 120, // 2 minutes
    dimensions: '3840x2160',
    aiModel: 'Stable Video Diffusion',
    prompts: 'Epic fantasy battle scene with dragons breathing fire over a medieval battlefield',
    status: 'published',
    isActive: true,
    isFeatured: true,
    downloads: 1234,
    views: 5678,
    favorites: 89,
    rating: '4.8',
    reviewCount: 156,
    updatedAt: new Date(),
    createdAt: new Date(),
    isFavorited: false,
    canDownload: true,
  },
  {
    id: 2,
    sellerId: 'user_2',
    title: 'Ambient Space Music - AI Composed Soundtrack',
    description: 'A mesmerizing 10-minute ambient space music track composed entirely by AI. Perfect for meditation, studying, or background music for creative projects.',
    shortDescription: 'Ambient space music for relaxation and focus',
    slug: 'ambient-space-music-soundtrack',
    category: 'ai_music',
    categoryId: 2,
    price: '9.99',
    licenseType: 'commercial',
    tags: '["ambient", "space", "meditation", "instrumental"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=2',
    downloadUrl: 'https://example.com/download/2',
    fileSize: 25165824, // 24MB
    duration: 600, // 10 minutes
    aiModel: 'MusicLM',
    prompts: 'Ambient space music with ethereal synthesizers and cosmic soundscapes',
    status: 'published',
    isActive: true,
    isFeatured: false,
    downloads: 892,
    views: 2341,
    favorites: 67,
    rating: '4.5',
    reviewCount: 43,
    updatedAt: new Date(),
    createdAt: new Date(),
    isFavorited: false,
    canDownload: true,
  },
  {
    id: 3,
    sellerId: 'user_3',
    title: 'Cyberpunk City Landscape - AI Generated Art',
    description: 'A breathtaking cyberpunk cityscape with neon lights, flying cars, and futuristic architecture. High-resolution digital art perfect for wallpapers, game assets, or creative projects.',
    shortDescription: 'Futuristic cyberpunk city with neon aesthetics',
    slug: 'cyberpunk-city-landscape-art',
    category: 'ai_image',
    categoryId: 3,
    price: '14.99',
    originalPrice: '19.99',
    licenseType: 'commercial',
    tags: '["cyberpunk", "city", "neon", "futuristic", "digital art"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=3',
    downloadUrl: 'https://example.com/download/3',
    fileSize: 15728640, // 15MB
    dimensions: '3840x2160',
    aiModel: 'Midjourney',
    prompts: 'Cyberpunk cityscape at night with neon lights and flying vehicles',
    status: 'published',
    isActive: true,
    isFeatured: true,
    downloads: 567,
    views: 1890,
    favorites: 123,
    rating: '4.7',
    reviewCount: 89,
    updatedAt: new Date(),
    createdAt: new Date(),
    isFavorited: false,
    canDownload: true,
  },
];

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductWithDetails[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore] = useState(true);

  const handleSearch = (query: string) => {
    // In a real app, this would trigger an API call
    // For demo, we'll just filter existing products
    if (query) {
      const filtered = mockProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
        || product.description.toLowerCase().includes(query.toLowerCase()),
      );
      setProducts(filtered);
    } else {
      setProducts(mockProducts);
    }
  };

  // Handle product preview
  const handlePreview = (_product: ProductWithDetails) => {
    // In a real app, this would open a preview modal or navigate to preview page
    // Preview product functionality would go here
  };

  // Handle adding to favorites
  const handleFavorite = (_productId: number) => {
    // In a real app, this would call your API to add/remove from favorites
    // Toggle favorite functionality would go here
  };

  // Handle load more products
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would append new products from your API
      setLoading(false);
    }, 1000);
  };

  // Handle URL parameters (category, search, etc.)
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');

    let filtered = [...mockProducts];

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
        || product.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'downloads':
            return b.downloads - a.downloads;
          case 'rating':
            return Number.parseFloat(b.rating) - Number.parseFloat(a.rating);
          case 'price_low':
            return Number.parseFloat(a.price) - Number.parseFloat(b.price);
          case 'price_high':
            return Number.parseFloat(b.price) - Number.parseFloat(a.price);
          default:
            return 0;
        }
      });
    }

    setProducts(filtered);
  }, [searchParams]);

  // Set document title based on search params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');

    let title = 'ZENO Marketplace - Discover Amazing AI Creations';
    if (category) {
      title = `${title} - ${category}`;
    } else if (search) {
      title = `${title} - Search: "${search}"`;
    } else if (sortBy) {
      title = `${title} - Sort by: "${sortBy}"`;
    }
    document.title = title;
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MarketplaceHero
        stats={mockStats}
        onSearch={handleSearch}
      />

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Cards */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              ∞ Browse ZENO Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore different sections of our infinite possibilities marketplace
            </p>
          </div>
          <CategoryCards />
        </div>

        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            ✨ All ZENO Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover amazing AI creations from our talented ZENO Creators
          </p>
        </div>
        <MarketplaceGrid
          products={products}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onAddToFavorites={handleFavorite}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
