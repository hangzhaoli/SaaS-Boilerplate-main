'use client';

import { Heart, Download, Star, Play, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { ProductWithDetails } from '@/types/Marketplace';

interface ProductCardProps {
  product: ProductWithDetails;
  onAddToFavorites?: (productId: number) => void;
  onPreview?: (product: ProductWithDetails) => void;
}

export function ProductCard({ product, onAddToFavorites, onPreview }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(product.isFavorited || false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorited(!isFavorited);
    onAddToFavorites?.(product.id);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview?.(product);
  };

  const formatPrice = (price: string) => {
    try {
      return `$${parseFloat(price).toFixed(2)}`;
    } catch {
      return '$0.00';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai_video':
        return '🎬';
      case 'ai_music':
        return '🎵';
      case 'ai_book':
        return '📚';
      case 'ai_tool':
        return '🛠️';
      case 'ai_image':
        return '🖼️';
      case 'ai_voice':
        return '🎙️';
      default:
        return '🤖';
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.replace('ai_', '').replace('_', ' ').toUpperCase();
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/marketplace/product/${product.slug}`}>
        {/* Product Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Featured Badge */}
          {product.isFeatured && (
            <Badge className="absolute left-2 top-2 bg-gradient-to-r from-orange-500 to-red-500">
              ⭐ Featured
            </Badge>
          )}

          {/* Category Badge */}
          <Badge variant="secondary" className="absolute right-2 top-2">
            {getCategoryIcon(product.category)} {getCategoryLabel(product.category)}
          </Badge>

          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex h-full items-center justify-center space-x-2">
              {product.previewUrl && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handlePreviewClick}
                  className="backdrop-blur-sm"
                >
                  <Play className="mr-1 h-4 w-4" />
                  Preview
                </Button>
              )}
            </div>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-2 left-2 flex space-x-3 text-white text-xs">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{product.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{product.downloads}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{product.favorites}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary">
              {product.title}
            </h3>
                          <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                className={`ml-2 p-1 h-8 w-8 ${isFavorited ? 'text-red-500' : 'text-muted-foreground'}`}
              >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Short Description */}
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          {/* Seller Info */}
          <div className="mb-3 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-sm text-muted-foreground">
              {product.seller?.displayName || 'Anonymous Seller'}
            </span>
            {product.seller?.sellerVerified && (
              <Badge variant="outline" className="text-xs">
                ✓ Verified
              </Badge>
            )}
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">
                  {parseFloat(product.rating).toFixed(1)}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            <div className="text-right">
              {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                <div className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
              <div className="font-bold text-primary">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>

          {/* Tags */}
          {product.tags && (
            <div className="mt-3 flex flex-wrap gap-1">
              {(() => {
                try {
                  const parsedTags = JSON.parse(product.tags);
                  return parsedTags.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ));
                } catch {
                  return null;
                }
              })()}
            </div>
          )}

          {/* AI Model Badge */}
          {product.aiModel && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                🤖 {product.aiModel}
              </Badge>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}