'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Heart, Eye } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ProductPurchase } from '@/features/marketplace/ProductPurchase';
import { ReviewSystem } from '@/features/reviews/ReviewSystem';

import type { 
  ProductWithDetails, 
  ReviewWithDetails, 
  CreateReviewForm, 
  LicenseType 
} from '@/types/Marketplace';

// Mock data - In a real app, this would come from your API based on the slug
const mockProduct: ProductWithDetails = {
  id: 1,
  sellerId: 'user_1',
  title: 'Epic Fantasy Battle Scene - AI Generated 4K Video',
  description: `A stunning 4K AI-generated video featuring an epic fantasy battle with dragons, knights, and magical effects. This cinematic masterpiece was created using advanced AI technology and is perfect for game trailers, presentations, or any creative project that needs high-quality fantasy content.

The video includes:
• Epic dragon battle sequences
• Medieval knight warfare
• Magical spell effects and explosions
• Dramatic lighting and atmosphere
• Professional color grading
• High-quality 4K resolution (3840x2160)

Perfect for:
- Game trailers and teasers
- Fantasy film projects
- Presentation backdrops
- Social media content
- Creative storytelling
- Educational content about medieval history`,
  shortDescription: 'Epic 4K fantasy battle scene with dragons and magical effects',
  slug: 'epic-fantasy-battle-scene',
  category: 'ai_video',
  categoryId: 1,
  price: '29.99',
  originalPrice: '39.99',
  licenseType: 'commercial',
  tags: '["fantasy", "battle", "dragons", "4k", "cinematic", "medieval", "magic", "epic"]',
  previewUrl: 'https://example.com/preview.mp4',
  thumbnailUrl: 'https://picsum.photos/1200/675?random=1',
  downloadUrl: 'https://example.com/download/1',
  fileSize: 2147483648, // 2GB
  duration: 120, // 2 minutes
  dimensions: '3840x2160',
  aiModel: 'Stable Video Diffusion XL',
  prompts: 'Epic fantasy battle scene with dragons breathing fire over a medieval battlefield, knights in shining armor fighting with swords and shields, magical explosions, dramatic cinematic lighting, 4K quality',
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
    bio: 'Professional AI video creator specializing in fantasy and cinematic content. Creating epic visual experiences for over 3 years.',
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
};

const mockReviews: ReviewWithDetails[] = [
  {
    id: 1,
    productId: 1,
    buyerId: 'buyer_1',
    orderId: 1,
    rating: 5,
    title: 'Absolutely Stunning!',
    comment: 'This video exceeded my expectations. The quality is incredible and the fantasy elements are beautifully crafted. Perfect for my game trailer project. Highly recommended!',
    isVerifiedPurchase: true,
    isHelpful: 12,
    sellerResponse: 'Thank you so much for the kind review! I\'m thrilled that the video worked perfectly for your game trailer. Best of luck with your project!',
    sellerResponseAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    createdAt: new Date('2024-01-15'),
    buyer: {
      id: 1,
      userId: 'buyer_1',
      displayName: 'GameDev Pro',
      bio: 'Indie game developer',
      avatar: 'https://picsum.photos/100/100?random=10',
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
    id: 2,
    productId: 1,
    buyerId: 'buyer_2',
    rating: 4,
    title: 'Great Quality, Minor Issues',
    comment: 'The video quality is excellent and the fantasy elements are well done. I had some minor issues with the file format compatibility, but nothing that couldn\'t be resolved. Overall very satisfied with the purchase.',
    isVerifiedPurchase: true,
    isHelpful: 8,
    updatedAt: new Date('2024-01-14'),
    createdAt: new Date('2024-01-14'),
    buyer: {
      id: 2,
      userId: 'buyer_2',
      displayName: 'VideoEditor123',
      bio: 'Video editor and content creator',
      avatar: 'https://picsum.photos/100/100?random=11',
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
    id: 3,
    productId: 1,
    buyerId: 'buyer_3',
    rating: 5,
    title: 'Perfect for My Presentation',
    comment: 'Used this for a corporate presentation about innovation and creativity. The epic fantasy theme really captured the audience\'s attention. Great work!',
    isVerifiedPurchase: true,
    isHelpful: 5,
    updatedAt: new Date('2024-01-13'),
    createdAt: new Date('2024-01-13'),
    buyer: {
      id: 3,
      userId: 'buyer_3',
      displayName: 'CorpPresenter',
      bio: 'Corporate trainer and presenter',
      avatar: 'https://picsum.photos/100/100?random=12',
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [canReview, setCanReview] = useState(false);

  // Simulate loading product data
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      
      // In a real app, you would fetch the product by slug from your API
      // const response = await fetch(`/api/products/by-slug/${params.slug}`);
      // const productData = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - check if slug matches
      if (params.slug === 'epic-fantasy-battle-scene') {
        setProduct(mockProduct);
        setReviews(mockReviews);
        // Mock user states
        setIsOwner(false); // Set to true if current user is the seller
        setHasPurchased(false); // Set to true if current user has purchased
        setCanReview(false); // Set to true if user can review (has purchased but not reviewed)
      } else {
        // Product not found
        setProduct(null);
      }
      
      setLoading(false);
    };

    if (params.slug) {
      loadProduct();
    }
  }, [params.slug]);

  // Update view count when product loads
  useEffect(() => {
    if (product && !loading) {
      // In a real app, you would track the view
      // fetch(`/api/products/${product.id}/view`, { method: 'POST' });
      console.log('Tracking view for product:', product.id);
    }
  }, [product, loading]);

  const handlePurchase = async (productId: number, licenseType: LicenseType) => {
    console.log('Purchasing product:', productId, 'with license:', licenseType);
    
    // In a real app, you would:
    // 1. Create a Stripe payment intent
    // 2. Redirect to Stripe checkout or show payment modal
    // 3. Handle payment success/failure
    // 4. Create order record
    // 5. Send download links
    
    // Simulate payment process
    try {
      // Show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setHasPurchased(true);
      setCanReview(true);
      
      console.log('Purchase successful!');
      router.push('/dashboard/orders');
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleSubmitReview = async (reviewData: CreateReviewForm) => {
    console.log('Submitting review:', reviewData);
    
    // In a real app, you would post to your API
    // const response = await fetch('/api/reviews', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(reviewData),
    // });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add the new review to the list (mock)
    const newReview: ReviewWithDetails = {
      id: reviews.length + 1,
      productId: reviewData.productId,
      buyerId: 'current_user',
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      isVerifiedPurchase: true,
      isHelpful: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
      buyer: {
        id: 999,
        userId: 'current_user',
        displayName: 'You',
        bio: 'Current user',
        avatar: 'https://picsum.photos/100/100?random=999',
        isSeller: false,
        sellerVerified: false,
        totalSales: 0,
        rating: '0.00',
        totalReviews: 0,
        socialLinks: '{}',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    };
    
    setReviews(prev => [newReview, ...prev]);
    setCanReview(false);
    
    // Update product rating
    if (product) {
      const newReviewCount = product.reviewCount + 1;
      const newRating = ((parseFloat(product.rating) * product.reviewCount) + reviewData.rating) / newReviewCount;
      setProduct(prev => prev ? {
        ...prev,
        rating: newRating.toFixed(1),
        reviewCount: newReviewCount
      } : null);
    }
  };

  const handleHelpfulVote = (reviewId: number) => {
    console.log('Voting helpful for review:', reviewId);
    // In a real app, you would update the helpful count via API
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, isHelpful: review.isHelpful + 1 }
        : review
    ));
  };

  const handleReportReview = (reviewId: number) => {
    console.log('Reporting review:', reviewId);
    // In a real app, you would send a report to your moderation system
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      setProduct(prev => prev ? {
        ...prev,
        isFavorited: !prev.isFavorited,
        favorites: prev.isFavorited ? prev.favorites - 1 : prev.favorites + 1
      } : null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Loading skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="aspect-video bg-muted rounded-lg" />
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Purchase Section */}
            <ProductPurchase
              product={product}
              onPurchase={handlePurchase}
              isOwner={isOwner}
              hasPurchased={hasPurchased}
            />

            {/* Additional Product Info */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{product.description}</p>
              </div>

              {/* Tags */}
              {product.tags && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(product.tags).map((tag: string, index: number) => (
                      <Link
                        key={index}
                        href={`/marketplace?search=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <ReviewSystem
              productId={product.id}
              reviews={reviews}
              averageRating={parseFloat(product.rating)}
              totalReviews={product.reviewCount}
              canReview={canReview}
              onSubmitReview={handleSubmitReview}
              onHelpfulVote={handleHelpfulVote}
              onReportReview={handleReportReview}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border rounded-lg p-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleFavorite}
                  className="flex-1 gap-2"
                >
                  <Heart className={`h-4 w-4 ${product.isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  {product.isFavorited ? 'Favorited' : 'Favorite'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex-1 gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-medium mb-3">Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">{product.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Downloads</span>
                  <span className="font-medium">{product.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Favorites</span>
                  <span className="font-medium">{product.favorites.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(new Date(product.createdAt))}
                  </span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-medium mb-3">About the Seller</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.seller?.displayName}</span>
                      {product.seller?.sellerVerified && (
                        <span className="text-xs text-green-600">✓ Verified</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.seller?.totalSales} sales • {parseFloat(product.seller?.rating || '0').toFixed(1)} rating
                    </div>
                  </div>
                </div>
                {product.seller?.bio && (
                  <p className="text-sm text-muted-foreground">{product.seller.bio}</p>
                )}
                <Link href={`/marketplace?sellerId=${product.sellerId}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}