'use client';

import { useState } from 'react';

import { OrderManagement } from '@/features/orders/OrderManagement';
import type { OrderWithDetails } from '@/types/Marketplace';

// Mock data - In a real app, this would come from your API
const mockPurchasedOrders: OrderWithDetails[] = [
  {
    id: 1,
    orderId: 'ORD-2024-001',
    buyerId: 'current_user',
    sellerId: 'user_1',
    productId: 1,
    amount: '29.99',
    currency: 'USD',
    status: 'completed',
    paymentIntentId: 'pi_test_123',
    licenseType: 'commercial',
    downloadUrl: 'https://example.com/download/secure/1',
    downloadExpiry: new Date('2024-12-31'),
    downloadCount: 2,
    maxDownloads: 5,
    metadata: '{}',
    updatedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    product: {
      id: 1,
      sellerId: 'user_1',
      title: 'Epic Fantasy Battle Scene - AI Generated 4K Video',
      description: 'A stunning 4K AI-generated video featuring an epic fantasy battle',
      shortDescription: 'Epic 4K fantasy battle scene',
      slug: 'epic-fantasy-battle-scene',
      category: 'ai_video',
      price: '29.99',
      licenseType: 'commercial',
      thumbnailUrl: 'https://picsum.photos/800/450?random=1',
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
    },
    seller: {
      id: 1,
      userId: 'user_1',
      displayName: 'FantasyCreator',
      bio: 'Professional AI video creator',
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
  },
  {
    id: 2,
    orderId: 'ORD-2024-002',
    buyerId: 'current_user',
    sellerId: 'user_2',
    productId: 2,
    amount: '12.99',
    currency: 'USD',
    status: 'completed',
    licenseType: 'personal',
    downloadUrl: 'https://example.com/download/secure/2',
    downloadCount: 1,
    maxDownloads: 3,
    metadata: '{}',
    updatedAt: new Date('2024-01-14'),
    createdAt: new Date('2024-01-14'),
    product: {
      id: 2,
      sellerId: 'user_2',
      title: 'Ambient Space Music - AI Composed Soundtrack',
      description: 'Beautiful ambient space music composed by AI',
      shortDescription: 'Ambient AI space music',
      slug: 'ambient-space-music',
      category: 'ai_music',
      price: '12.99',
      licenseType: 'personal',
      thumbnailUrl: 'https://picsum.photos/800/450?random=2',
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
    },
    seller: {
      id: 2,
      userId: 'user_2',
      displayName: 'SoundWave AI',
      bio: 'AI music producer',
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
  },
  {
    id: 3,
    orderId: 'ORD-2024-003',
    buyerId: 'current_user',
    sellerId: 'user_3',
    productId: 3,
    amount: '49.99',
    currency: 'USD',
    status: 'pending',
    licenseType: 'commercial',
    downloadCount: 0,
    maxDownloads: 5,
    metadata: '{}',
    updatedAt: new Date('2024-01-16'),
    createdAt: new Date('2024-01-16'),
    product: {
      id: 3,
      sellerId: 'user_3',
      title: 'Cyberpunk City Generator - AI Tool',
      description: 'Advanced AI tool for generating cyberpunk cityscapes',
      shortDescription: 'AI cyberpunk city generator',
      slug: 'cyberpunk-city-generator',
      category: 'ai_tool',
      price: '49.99',
      licenseType: 'commercial',
      thumbnailUrl: 'https://picsum.photos/800/450?random=3',
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
    },
    seller: {
      id: 3,
      userId: 'user_3',
      displayName: 'CyberTools',
      bio: 'Developer of AI tools',
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
  },
];

const mockSoldOrders: OrderWithDetails[] = [
  {
    id: 4,
    orderId: 'ORD-2024-004',
    buyerId: 'buyer_1',
    sellerId: 'current_user',
    productId: 4,
    amount: '24.99',
    currency: 'USD',
    status: 'completed',
    licenseType: 'personal',
    downloadCount: 1,
    maxDownloads: 3,
    metadata: '{}',
    updatedAt: new Date('2024-01-12'),
    createdAt: new Date('2024-01-12'),
    product: {
      id: 4,
      sellerId: 'current_user',
      title: 'Abstract Art Collection - AI Generated',
      description: 'Collection of abstract AI art pieces',
      shortDescription: 'AI abstract art collection',
      slug: 'abstract-art-collection',
      category: 'ai_image',
      price: '24.99',
      licenseType: 'personal',
      thumbnailUrl: 'https://picsum.photos/800/450?random=4',
      status: 'published',
      isActive: true,
      isFeatured: false,
      downloads: 45,
      views: 234,
      favorites: 12,
      rating: '4.3',
      reviewCount: 5,
      metadata: '{}',
      updatedAt: new Date('2024-01-12'),
      createdAt: new Date('2024-01-01'),
    },
    buyer: {
      id: 4,
      userId: 'buyer_1',
      displayName: 'ArtLover',
      bio: 'Digital art enthusiast',
      avatar: 'https://picsum.photos/100/100?random=4',
      isSeller: false,
      sellerVerified: false,
      totalSales: 0,
      rating: '0.00',
      totalReviews: 0,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  },
  {
    id: 5,
    orderId: 'ORD-2024-005',
    buyerId: 'buyer_2',
    sellerId: 'current_user',
    productId: 5,
    amount: '15.99',
    currency: 'USD',
    status: 'completed',
    licenseType: 'commercial',
    downloadCount: 3,
    maxDownloads: 5,
    metadata: '{}',
    updatedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    product: {
      id: 5,
      sellerId: 'current_user',
      title: 'Meditation Soundscapes - AI Composed',
      description: 'Relaxing AI-composed meditation music',
      shortDescription: 'AI meditation soundscapes',
      slug: 'meditation-soundscapes',
      category: 'ai_music',
      price: '15.99',
      licenseType: 'commercial',
      thumbnailUrl: 'https://picsum.photos/800/450?random=5',
      status: 'published',
      isActive: true,
      isFeatured: false,
      downloads: 67,
      views: 345,
      favorites: 23,
      rating: '4.7',
      reviewCount: 8,
      metadata: '{}',
      updatedAt: new Date('2024-01-10'),
      createdAt: new Date('2023-12-28'),
    },
    buyer: {
      id: 5,
      userId: 'buyer_2',
      displayName: 'ZenMaster',
      bio: 'Meditation instructor',
      avatar: 'https://picsum.photos/100/100?random=5',
      isSeller: false,
      sellerVerified: false,
      totalSales: 0,
      rating: '0.00',
      totalReviews: 0,
      socialLinks: '{}',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  },
];

export default function OrdersPage() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (orderId: number) => {
    console.log('Downloading order:', orderId);
    // In a real app, this would:
    // 1. Verify user has permission to download
    // 2. Check download limits
    // 3. Generate secure download link
    // 4. Track download count
    // 5. Redirect to download or start download
  };

  const handleRefund = async (orderId: number) => {
    console.log('Processing refund for order:', orderId);
    // In a real app, this would:
    // 1. Verify refund eligibility
    // 2. Process refund through payment provider
    // 3. Update order status
    // 4. Send notifications to buyer and seller
    // 5. Update statistics
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update order status in real app
      console.log('Refund processed successfully');
    } catch (error) {
      console.error('Refund failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderManagement
      purchasedOrders={mockPurchasedOrders}
      soldOrders={mockSoldOrders}
      loading={loading}
      onDownload={handleDownload}
      onRefund={handleRefund}
    />
  );
}