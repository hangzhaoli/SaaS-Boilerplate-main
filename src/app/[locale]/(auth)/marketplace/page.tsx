'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { MarketplaceHero } from '@/features/marketplace/MarketplaceHero';
import { MarketplaceGrid } from '@/features/marketplace/MarketplaceGrid';
import { CategoryCards } from '@/features/marketplace/CategoryCards';

import type { ProductWithDetails, MarketplaceStats, ProductFilters } from '@/types/Marketplace';

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
    downloads: 543,
    views: 2341,
    favorites: 89,
    rating: '4.8',
    reviewCount: 23,
    metadata: '{}',
    updatedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    seller: {
      id: 1,
      userId: 'user_1',
      displayName: 'FantasyCreator',
      bio: 'Professional AI video creator specializing in fantasy content',
      avatar: 'https://picsum.photos/100/100?random=1',
      isSeller: true,
      sellerVerified: true,
      totalSales: 156,
      rating: '4.9',
      totalReviews: 87,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    isFavorited: false,
  },
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
    duration: 300, // 5 minutes
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
    createdAt: new Date('2024-01-08'),
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
    id: 3,
    sellerId: 'user_3',
    title: 'Cyberpunk City Generator - AI Tool',
    description: 'An advanced AI tool that generates stunning cyberpunk cityscape images. Customize parameters like neon colors, building density, and weather effects.',
    shortDescription: 'AI tool for generating cyberpunk cityscapes',
    slug: 'cyberpunk-city-generator',
    category: 'ai_tool',
    price: '49.99',
    licenseType: 'commercial',
    tags: '["cyberpunk", "city", "generator", "tool", "customizable"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=3',
    aiModel: 'Custom Stable Diffusion',
    status: 'published',
    isActive: true,
    isFeatured: true,
    downloads: 78,
    views: 456,
    favorites: 23,
    rating: '4.9',
    reviewCount: 8,
    metadata: '{}',
    updatedAt: new Date('2024-01-13'),
    createdAt: new Date('2024-01-05'),
    seller: {
      id: 3,
      userId: 'user_3',
      displayName: 'CyberTools',
      bio: 'Developer of AI tools for creative professionals',
      avatar: 'https://picsum.photos/100/100?random=3',
      isSeller: true,
      sellerVerified: true,
      totalSales: 45,
      rating: '4.8',
      totalReviews: 19,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    isFavorited: false,
  }
];

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductWithDetails[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore] = useState(true);

  // Handle search from hero component
  const handleSearch = (query: string) => {
    // In a real app, this would trigger an API call
    console.log('Searching for:', query);
    // For demo, we'll just filter existing products
    if (query) {
      const filtered = mockProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(mockProducts);
    }
  };

  // Handle add to favorites
  const handleAddToFavorites = async (productId: number) => {
    // In a real app, this would call your API
    console.log('Adding to favorites:', productId);
    
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, isFavorited: !product.isFavorited }
        : product
    ));
  };

  // Handle product preview
  const handlePreview = (product: ProductWithDetails) => {
    // In a real app, this would open a preview modal or navigate to preview page
    console.log('Previewing product:', product.title);
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

    if (category || search || sortBy) {
      // In a real app, this would call your API with filters
      let filtered = [...mockProducts];

      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }

      if (search) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sortBy) {
        filtered.sort((a, b) => {
          switch (sortBy) {
            case 'downloads':
              return b.downloads - a.downloads;
            case 'rating':
              return parseFloat(b.rating) - parseFloat(a.rating);
            case 'price_low':
              return parseFloat(a.price) - parseFloat(b.price);
            case 'price_high':
              return parseFloat(b.price) - parseFloat(a.price);
            default:
              return 0;
          }
        });
      }

      setProducts(filtered);
    }
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
          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
          <CategoryCards />
        </div>

        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <MarketplaceGrid
          products={products}
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