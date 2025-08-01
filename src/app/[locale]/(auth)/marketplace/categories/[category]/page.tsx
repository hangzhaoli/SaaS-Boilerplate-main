'use client';

import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { MarketplaceGrid } from '@/features/marketplace/MarketplaceGrid';
import type { ProductCategory, ProductWithDetails } from '@/types/Marketplace';

// Custom type to fix category field type issue
type CategoryProduct = Omit<ProductWithDetails, 'category'> & {
  category: ProductCategory;
};

// Mock data - In a real app, this would come from your API
const mockProducts: CategoryProduct[] = [
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
    createdAt: new Date('2024-01-03'),
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
    createdAt: new Date('2024-01-02'),
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

const categoryInfo: Record<ProductCategory, { name: string; description: string; icon: string }> = {
  ai_video: {
    name: 'AI Videos',
    description: 'Discover stunning AI-generated videos for your creative projects',
    icon: '🎬',
  },
  ai_music: {
    name: 'AI Music',
    description: 'Explore AI-composed music tracks and soundscapes',
    icon: '🎵',
  },
  ai_image: {
    name: 'AI Images',
    description: 'Browse beautiful AI-generated images and artwork',
    icon: '🖼️',
  },
  ai_tool: {
    name: 'AI Tools',
    description: 'Find powerful AI tools to enhance your workflow',
    icon: '🛠️',
  },
  ai_book: {
    name: 'AI Books',
    description: 'Read AI-written books and literature',
    icon: '📚',
  },
  ai_voice: {
    name: 'AI Voice',
    description: 'Discover AI-generated voice content and narration',
    icon: '🎙️',
  },
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as ProductCategory;

  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(true);

  const categoryData = categoryInfo[category];

  useEffect(() => {
    // Filter products by category
    const filteredProducts = mockProducts.filter(product => product.category === category);
    setProducts(filteredProducts);
    setLoading(false);
  }, [category]);

  const handleAddToFavorites = async (productId: number) => {
    // In a real app, this would call your API
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, isFavorited: !product.isFavorited }
        : product,
    ));
  };

  const handlePreview = (product: ProductWithDetails) => {
    // In a real app, this would open a preview modal or navigate to preview page
    router.push(`/marketplace/products/${product.slug}`);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!categoryData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Category Not Found
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            The category you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/marketplace')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Marketplace
          </Button>

          <div className="mb-4 flex items-center gap-4">
            <div className="text-4xl">{categoryData.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {categoryData.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {categoryData.description}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {products.length}
            {' '}
            products available
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
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
