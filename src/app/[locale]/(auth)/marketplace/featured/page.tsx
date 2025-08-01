'use client';

import { Star, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MarketplaceGrid } from '@/features/marketplace/MarketplaceGrid';
import type { ProductCategory, ProductWithDetails } from '@/types/Marketplace';

// Custom type to fix category field type issue
type CategoryProduct = Omit<ProductWithDetails, 'category'> & {
  category: ProductCategory;
};

// Mock featured products - In a real app, this would come from your API
const featuredProducts: CategoryProduct[] = [
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
    fileSize: 2147483648,
    duration: 120,
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
  },
  {
    id: 6,
    sellerId: 'user_6',
    title: 'AI Voice Narrator - Professional Audiobook Voice',
    description: 'High-quality AI-generated voice narration perfect for audiobooks, podcasts, and educational content. Natural-sounding and professionally trained.',
    shortDescription: 'Professional AI voice for audiobooks and podcasts',
    slug: 'ai-voice-narrator-audiobook',
    category: 'ai_voice',
    price: '24.99',
    licenseType: 'commercial',
    tags: '["voice", "narration", "audiobook", "podcast", "professional"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=6',
    aiModel: 'ElevenLabs',
    status: 'published',
    isActive: true,
    isFeatured: true,
    downloads: 89,
    views: 345,
    favorites: 28,
    rating: '4.9',
    reviewCount: 11,
    metadata: '{}',
    updatedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-01'),
    seller: {
      id: 6,
      userId: 'user_6',
      displayName: 'VoiceAI Pro',
      bio: 'Creating natural AI voices for content creators',
      avatar: 'https://picsum.photos/100/100?random=6',
      isSeller: true,
      sellerVerified: true,
      totalSales: 34,
      rating: '4.9',
      totalReviews: 18,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    isFavorited: false,
  },
];

export default function FeaturedPage() {
  const router = useRouter();
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(featuredProducts);
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 py-16 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Star className="size-8 fill-current text-yellow-500" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Featured Products
              </h1>
              <Star className="size-8 fill-current text-yellow-500" />
            </div>
          </div>

          <p className="mx-auto mb-6 max-w-3xl text-center text-xl text-gray-600 dark:text-gray-400">
            Discover our handpicked selection of the most popular and highest-rated AI-generated content
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              <span>Trending Now</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-current text-yellow-500" />
              <span>Editor's Choice</span>
            </div>
            <div className="font-medium text-primary">
              {products.length}
              {' '}
              featured items
            </div>
          </div>
        </div>
      </div>

      {/* Featured Badge */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20">
          <div className="mb-2 flex items-center gap-3">
            <Star className="size-5 fill-current text-yellow-600" />
            <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
              Why These Products Are Featured
            </h2>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Our featured products are selected based on exceptional quality, high user ratings, popularity, and innovation.
            These items represent the best of what our AI marketplace has to offer.
          </p>
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
