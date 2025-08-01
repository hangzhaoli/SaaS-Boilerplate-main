'use client';

import { useState } from 'react';

import { ProductManagement } from '@/features/products/ProductManagement';
import type { ProductStatus, ProductWithDetails } from '@/types/Marketplace';

// Mock data - In a real app, this would come from your API
const mockProducts: ProductWithDetails[] = [
  {
    id: 1,
    sellerId: 'current_user',
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
    serviceFeePercent: 10, // 10% platform fee
    updatedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 2,
    sellerId: 'current_user',
    title: 'Ambient Space Music - AI Composed Soundtrack',
    description: 'A beautiful ambient space music track composed entirely by AI. Perfect for meditation, relaxation, or background music for sci-fi projects.',
    shortDescription: 'Ambient AI-composed space music for relaxation',
    slug: 'ambient-space-music',
    category: 'ai_music',
    categoryId: 2,
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
    serviceFeePercent: 10, // 10% platform fee
    updatedAt: new Date('2024-01-14'),
    createdAt: new Date('2024-01-08'),
  },
  {
    id: 3,
    sellerId: 'current_user',
    title: 'Cyberpunk Portrait Collection - Draft',
    description: 'A collection of 50 AI-generated cyberpunk portraits featuring futuristic characters with neon aesthetics.',
    shortDescription: 'Collection of AI cyberpunk portraits',
    slug: 'cyberpunk-portrait-collection',
    category: 'ai_image',
    categoryId: 3,
    price: '19.99',
    licenseType: 'commercial',
    tags: '["cyberpunk", "portraits", "futuristic", "neon", "collection"]',
    thumbnailUrl: 'https://picsum.photos/800/450?random=3',
    aiModel: 'Midjourney',
    status: 'draft',
    isActive: false,
    isFeatured: false,
    downloads: 0,
    views: 45,
    favorites: 3,
    rating: '0.00',
    reviewCount: 0,
    metadata: '{}',
    serviceFeePercent: 10, // 10% platform fee
    updatedAt: new Date('2024-01-16'),
    createdAt: new Date('2024-01-16'),
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithDetails[]>(mockProducts);
  const [loading, setLoading] = useState(false);

  const handleEditProduct = (_productId: number) => {
    // In a real app, this would navigate to edit page or open modal
    // Example: router.push(`/dashboard/products/${productId}/edit`);
    // Removed console.log for production
  };

  const handleDeleteProduct = async (productId: number) => {
    // In a real app, this would call your API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove product from list
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch {
      // Use a proper error handling mechanism instead of console.error
      // For example, set an error state and display it to the user
      // setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (productId: number, newStatus: ProductStatus) => {
    // In a real app, this would call your API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update product status
      setProducts(prev => prev.map(product =>
        product.id === productId
          ? { ...product, status: newStatus }
          : product,
      ));
    } catch {
      // Use a proper error handling mechanism instead of console.error
      // For example, set an error state and display it to the user
      // setError('Failed to update product status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductManagement
      products={products}
      loading={loading}
      onEditProduct={handleEditProduct}
      onDeleteProduct={handleDeleteProduct}
      onToggleStatus={handleToggleStatus}
    />
  );
}
