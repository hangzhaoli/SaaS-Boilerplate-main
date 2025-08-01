'use client';

import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ProductCard } from './ProductCard';
import type { ProductWithDetails, ProductFilters, ProductCategory } from '@/types/Marketplace';

interface MarketplaceGridProps {
  products: ProductWithDetails[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onAddToFavorites?: (productId: number) => void;
  onPreview?: (product: ProductWithDetails) => void;
}

const categories: { value: ProductCategory; label: string; icon: string; imageSrc?: string }[] = [
  { value: 'ai_video', label: 'AI Videos', icon: '🎬', imageSrc: '/image_assets/image.png' },
  { value: 'ai_music', label: 'AI Music', icon: '🎵', imageSrc: '/image_assets/image (1).png' },
  { value: 'ai_image', label: 'AI Images', icon: '🖼️', imageSrc: '/image_assets/image (2).png' },
  { value: 'ai_tool', label: 'AI Tools', icon: '🛠️', imageSrc: '/image_assets/image (3).png' },
  { value: 'ai_book', label: 'AI Books', icon: '📚' },
  { value: 'ai_voice', label: 'AI Voice', icon: '🎙️' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'downloads', label: 'Most Downloaded' },
];

export function MarketplaceGrid({ 
  products, 
  loading = false, 
  onLoadMore, 
  hasMore = false,
  onAddToFavorites,
  onPreview 
}: MarketplaceGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on current filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const searchTermLower = searchTerm.toLowerCase();
        const titleMatch = product.title.toLowerCase().includes(searchTermLower);
        const descriptionMatch = product.description.toLowerCase().includes(searchTermLower);
        
        let tagsMatch = false;
        if (product.tags) {
          try {
            const parsedTags = JSON.parse(product.tags);
            tagsMatch = parsedTags.some((tag: string) => 
              tag.toLowerCase().includes(searchTermLower)
            );
          } catch {
            // Silently fail if JSON parsing fails
          }
        }
        
        return titleMatch || descriptionMatch || tagsMatch;
      });
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => parseFloat(product.price) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => parseFloat(product.price) <= filters.maxPrice!);
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => parseFloat(product.rating) >= filters.rating!);
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter(product => product.isFeatured);
    }

    // Sort products
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'price_low':
            return parseFloat(a.price) - parseFloat(b.price);
          case 'price_high':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'rating':
            return parseFloat(b.rating) - parseFloat(a.rating);
          case 'downloads':
            return b.downloads - a.downloads;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filters]);

  const handleFilterChange = <T extends keyof ProductFilters>(key: T, value: ProductFilters[T] | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const activeFiltersCount = Object.keys(filters).length + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search AI products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Category
                {filters.category && (
                  <Badge variant="secondary" className="ml-1">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleFilterChange('category', undefined)}>
                All Categories
              </DropdownMenuItem>
              {categories.map(category => (
                <DropdownMenuItem
                  key={category.value}
                  onClick={() => handleFilterChange('category', category.value)}
                  className="flex items-center gap-2"
                >
                  {category.imageSrc ? (
                    <img 
                      src={category.imageSrc} 
                      alt={category.label} 
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <span>{category.icon}</span>
                  )}
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterChange('sortBy', option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Featured Filter */}
          <Button
            variant={filters.featured ? "default" : "outline"}
            onClick={() => handleFilterChange('featured', !filters.featured)}
            className="gap-2"
          >
            ⭐ Featured
          </Button>

          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear Filters ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.category || searchTerm) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.value === filters.category)?.label}
              <button
                onClick={() => handleFilterChange('category', undefined)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredProducts.length} products found
      </div>

      {/* Products Grid */}
      {loading && filteredProducts.length === 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-lg mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-2">No products found</div>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToFavorites={onAddToFavorites}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center">
          <Button 
            onClick={onLoadMore} 
            variant="outline"
            aria-label="Load more products"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Products'}
          </Button>
        </div>
      )}

      {/* Loading More */}
      {loading && filteredProducts.length > 0 && (
        <div className="text-center py-4">
          <div className="text-sm text-muted-foreground">Loading more products...</div>
        </div>
      )}
    </div>
  );
}