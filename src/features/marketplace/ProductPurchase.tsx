'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Shield, 
  Download, 
  Clock, 
  Star, 
  Users,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { ProductWithDetails, LicenseType } from '@/types/Marketplace';

interface ProductPurchaseProps {
  product: ProductWithDetails;
  onPurchase?: (productId: number, licenseType: LicenseType) => Promise<void>;
  loading?: boolean;
  isOwner?: boolean;
  hasPurchased?: boolean;
}

export function ProductPurchase({ 
  product, 
  onPurchase, 
  loading = false, 
  isOwner = false,
  hasPurchased = false 
}: ProductPurchaseProps) {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>(product.licenseType);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const router = useRouter();

  // 服务费率，默认为10%
  const serviceFeePercent = product.serviceFeePercent || 10;

  const licenseOptions: { 
    type: LicenseType; 
    label: string; 
    description: string; 
    priceMultiplier: number;
    features: string[];
  }[] = [
    {
      type: 'personal',
      label: 'Personal License',
      description: 'For personal use only',
      priceMultiplier: 1,
      features: [
        'Personal projects only',
        'Non-commercial use',
        '5 downloads',
        'Standard support'
      ]
    },
    {
      type: 'commercial',
      label: 'Commercial License',
      description: 'For commercial projects',
      priceMultiplier: 2,
      features: [
        'Commercial projects',
        'Client work allowed',
        '10 downloads',
        'Priority support',
        'License certificate'
      ]
    },
    {
      type: 'extended',
      label: 'Extended License',
      description: 'Full commercial rights',
      priceMultiplier: 5,
      features: [
        'Unlimited commercial use',
        'Resale rights',
        'Unlimited downloads',
        'Premium support',
        'Source files included',
        'License certificate'
      ]
    }
  ];

  const getPrice = (licenseType: LicenseType) => {
    const basePrice = parseFloat(product.price);
    const multiplier = licenseOptions.find(l => l.type === licenseType)?.priceMultiplier || 1;
    return basePrice * multiplier;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // 计算服务费
  const calculateServiceFee = (price: number) => {
    return (price * serviceFeePercent) / 100;
  };

  // 计算卖家收到的金额
  const calculateSellerAmount = (price: number) => {
    return price - calculateServiceFee(price);
  };

  const handlePurchaseClick = async () => {
    if (isOwner) {
      return;
    }

    if (hasPurchased) {
      // Navigate to downloads page
      router.push('/dashboard/orders');
      return;
    }

    // 直接跳转到结账页面
    router.push(`/marketplace/checkout?product=${product.slug}&license=${selectedLicense}`);
  };

  const handleConfirmPurchase = async () => {
    if (!onPurchase) return;

    try {
      await onPurchase(product.id, selectedLicense);
      setShowPurchaseModal(false);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai_video': return '🎬';
      case 'ai_music': return '🎵';
      case 'ai_book': return '📚';
      case 'ai_tool': return '🛠️';
      case 'ai_image': return '🖼️';
      case 'ai_voice': return '🎙️';
      default: return '🤖';
    }
  };

  const currentPrice = getPrice(selectedLicense);
  const serviceFee = calculateServiceFee(currentPrice);
  const sellerAmount = calculateSellerAmount(currentPrice);

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="relative">
        <div className="aspect-video overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        
        {product.isFeatured && (
          <Badge className="absolute left-4 top-4 bg-gradient-to-r from-orange-500 to-red-500">
            ⭐ Featured
          </Badge>
        )}

        <Badge variant="secondary" className="absolute right-4 top-4">
          {getCategoryIcon(product.category)} {product.category.replace('ai_', '').replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-muted-foreground mb-4">{product.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{parseFloat(product.rating).toFixed(1)}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{product.downloads.toLocaleString()} downloads</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{product.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{product.seller?.displayName || 'Anonymous'}</span>
              {product.seller?.sellerVerified && (
                <Badge variant="outline" className="text-xs">
                  ✓ Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {product.seller?.totalSales} sales • {parseFloat(product.seller?.rating || '0').toFixed(1)} rating
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Purchase Options
          </CardTitle>
          <CardDescription>
            Choose the license that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* License Options */}
          <div className="grid gap-4">
            {licenseOptions.map((license) => (
              <div
                key={license.type}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedLicense === license.type 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedLicense(license.type)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{license.label}</h3>
                    <p className="text-sm text-muted-foreground">{license.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      {formatPrice(getPrice(license.type))}
                    </div>
                    {license.priceMultiplier > 1 && (
                      <div className="text-xs text-muted-foreground">
                        {license.priceMultiplier}x base price
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {license.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI Information */}
          {(product.aiModel || product.prompts) && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                🤖 AI Information
              </h4>
              {product.aiModel && (
                <p className="text-sm mb-1">
                  <strong>AI Model:</strong> {product.aiModel}
                </p>
              )}
              {product.prompts && (
                <p className="text-sm">
                  <strong>Prompts:</strong> {product.prompts}
                </p>
              )}
            </div>
          )}

          {/* File Information */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
            <h4 className="font-medium mb-2">File Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {product.fileSize && (
                <div>
                  <strong>File Size:</strong> {(product.fileSize / (1024 * 1024)).toFixed(1)} MB
                </div>
              )}
              {product.duration && (
                <div>
                  <strong>Duration:</strong> {Math.floor(product.duration / 60)}:{(product.duration % 60).toString().padStart(2, '0')}
                </div>
              )}
              {product.dimensions && (
                <div>
                  <strong>Dimensions:</strong> {product.dimensions}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {isOwner ? (
            <div className="w-full p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">This is your product</span>
              </div>
            </div>
          ) : hasPurchased ? (
            <Button 
              onClick={handlePurchaseClick}
              className="w-full"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Go to Downloads
            </Button>
          ) : (
            <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
              <DialogTrigger asChild>
                <Button 
                  onClick={handlePurchaseClick}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {loading ? 'Processing...' : `Purchase for ${formatPrice(currentPrice)}`}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Purchase</DialogTitle>
                  <DialogDescription>
                    You are about to purchase "{product.title}" with a {selectedLicense} license
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="relative h-12 w-16 rounded overflow-hidden">
                      <Image
                        src={product.thumbnailUrl}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {licenseOptions.find(l => l.type === selectedLicense)?.label}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {formatPrice(currentPrice)}
                      </div>
                    </div>
                  </div>

                  {/* 费用明细 */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Price Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Product Price</span>
                        <span>{formatPrice(currentPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span>Platform Fee ({serviceFeePercent}%)</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">
                                  This fee helps maintain the platform and provide secure transactions.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span>{formatPrice(serviceFee)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Creator Earnings</span>
                        <span>{formatPrice(sellerAmount)}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(currentPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment powered by Stripe</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Instant download after successful payment</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPurchaseModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleConfirmPurchase}
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? 'Processing...' : 'Confirm Purchase'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Security Features */}
          <div className="w-full flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Licensed Content</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}