'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { CheckoutProcess } from '@/features/marketplace/CheckoutProcess';

import type { Product, LicenseType } from '@/types/Marketplace';

// Mock product data for demonstration
const mockProducts: Record<string, Product> = {
  'ai-generated-fantasy-landscape': {
    id: 1,
    sellerId: 'user_1',
    title: 'AI Generated Fantasy Landscape',
    description: 'Epic fantasy landscape with mountains, castles and dragons',
    shortDescription: 'Epic fantasy landscape',
    slug: 'ai-generated-fantasy-landscape',
    category: 'ai_image',
    price: '29.99',
    licenseType: 'personal',
    thumbnailUrl: 'https://picsum.photos/800/450?random=1',
    status: 'published',
    isActive: true,
    isFeatured: true,
    downloads: 120,
    views: 1500,
    favorites: 45,
    rating: '4.7',
    reviewCount: 24,
    serviceFeePercent: 10,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  'ambient-space-music': {
    id: 2,
    sellerId: 'user_2',
    title: 'Ambient Space Music',
    description: 'Relaxing ambient music with space themes and cosmic sounds',
    shortDescription: 'Relaxing space themed music',
    slug: 'ambient-space-music',
    category: 'ai_music',
    price: '19.99',
    licenseType: 'personal',
    thumbnailUrl: 'https://picsum.photos/800/450?random=2',
    status: 'published',
    isActive: true,
    isFeatured: false,
    downloads: 85,
    views: 950,
    favorites: 32,
    rating: '4.5',
    reviewCount: 18,
    serviceFeePercent: 10,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [licenseType, setLicenseType] = useState<LicenseType>('personal');
  const [licensePrice, setLicensePrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const productSlug = searchParams.get('product');
        const license = searchParams.get('license') as LicenseType || 'personal';
        
        if (!productSlug) {
          throw new Error('Product not specified');
        }
        
        // In a real app, this would be an API call
        // For demo, we're using mock data
        const productData = mockProducts[productSlug];
        
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
        setLicenseType(license);
        
        // Calculate price based on license
        const basePrice = parseFloat(productData.price);
        let multiplier = 1;
        
        if (license === 'commercial') {
          multiplier = 2;
        } else if (license === 'extended') {
          multiplier = 5;
        }
        
        setLicensePrice(basePrice * multiplier);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [searchParams]);
  
  const handleComplete = (orderId: string) => {
    console.log('Order completed:', orderId);
    router.push(`/dashboard/orders?order=${orderId}`);
  };
  
  const handleCancel = () => {
    // Go back to product page
    if (product) {
      router.push(`/marketplace/product/${product.slug}`);
    } else {
      router.push('/marketplace');
    }
  };
  
  if (loading) {
    return (
      <>
        <TitleBar title="Checkout" />
        <DashboardSection>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </DashboardSection>
      </>
    );
  }
  
  if (error || !product) {
    return (
      <>
        <TitleBar title="Checkout Error" />
        <DashboardSection>
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{error || 'Product not found'}</p>
            <button
              onClick={() => router.push('/marketplace')}
              className="text-primary hover:underline"
            >
              Return to Marketplace
            </button>
          </div>
        </DashboardSection>
      </>
    );
  }
  
  return (
    <>
      <TitleBar title="Complete Your Purchase" />
      <DashboardSection>
        <CheckoutProcess
          product={product}
          licenseType={licenseType}
          licensePrice={licensePrice}
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      </DashboardSection>
    </>
  );
}