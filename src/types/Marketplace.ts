// TypeScript types for AI Marketplace

export type ProductCategory = 'ai_video' | 'ai_music' | 'ai_book' | 'ai_tool' | 'ai_image' | 'ai_voice';

export type ProductStatus = 'draft' | 'published' | 'suspended' | 'deleted';

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export type LicenseType = 'personal' | 'commercial' | 'extended';

export type UserProfile = {
  id: number;
  userId: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  isSeller: boolean;
  sellerVerified: boolean;
  totalSales: number;
  rating: string;
  totalReviews: number;
  socialLinks?: string; // JSON string
  updatedAt: Date;
  createdAt: Date;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
};

export type Product = {
  id: number;
  sellerId: string;
  organizationId?: string;
  title: string;
  description: string;
  shortDescription?: string;
  slug: string;
  category: ProductCategory;
  categoryId?: number;
  price: string;
  originalPrice?: string;
  licenseType: LicenseType;
  tags?: string; // JSON array as string
  previewUrl?: string;
  thumbnailUrl: string;
  downloadUrl?: string;
  fileSize?: number;
  duration?: number;
  dimensions?: string;
  aiModel?: string;
  prompts?: string;
  status: ProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  downloads: number;
  views: number;
  favorites: number;
  rating: string;
  reviewCount: number;
  metadata?: string; // JSON string
  updatedAt: Date;
  createdAt: Date;
};

export type ProductFile = {
  id: number;
  productId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize?: number;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: Date;
};

export type Order = {
  id: number;
  orderId: string;
  buyerId: string;
  sellerId: string;
  productId: number;
  organizationId?: string;
  amount: string;
  currency: string;
  status: OrderStatus;
  paymentIntentId?: string;
  licenseType: LicenseType;
  downloadUrl?: string;
  downloadExpiry?: Date;
  downloadCount: number;
  maxDownloads: number;
  metadata?: string;
  updatedAt: Date;
  createdAt: Date;
};

export type Review = {
  id: number;
  productId: number;
  buyerId: string;
  orderId?: number;
  rating: number;
  title?: string;
  comment?: string;
  isVerifiedPurchase: boolean;
  isHelpful: number;
  sellerResponse?: string;
  sellerResponseAt?: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type Favorite = {
  id: number;
  userId: string;
  productId: number;
  createdAt: Date;
};

export type ProductView = {
  id: number;
  productId: number;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
};

// Extended types with relations
export type ProductWithDetails = Product & {
  seller?: UserProfile;
  categoryDetails?: Category; // Renamed to avoid conflict with Product.category
  files?: ProductFile[];
  reviews?: Review[];
  isFavorited?: boolean;
  canDownload?: boolean;
};

export type OrderWithDetails = Order & {
  product?: Product;
  buyer?: UserProfile;
  seller?: UserProfile;
};

export type ReviewWithDetails = Review & {
  buyer?: UserProfile;
  product?: Product;
};

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Search and filter types
export type ProductFilters = {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  tags?: string[];
  sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating' | 'downloads';
  search?: string;
  sellerId?: string;
  featured?: boolean;
};

export type MarketplaceStats = {
  totalProducts: number;
  totalSellers: number;
  totalSales: number;
  featuredProducts: number;
  categoryCounts: Record<ProductCategory, number>;
};

// Form types
export type CreateProductForm = {
  title: string;
  description: string;
  shortDescription?: string;
  category: ProductCategory;
  categoryId?: number;
  price: number;
  originalPrice?: number;
  licenseType: LicenseType;
  tags: string[];
  aiModel?: string;
  prompts?: string;
  files: File[];
  thumbnailFile: File;
  previewFile?: File;
};

export type UpdateProductForm = Partial<CreateProductForm> & {
  id: number;
};

export type CreateReviewForm = {
  productId: number;
  rating: number;
  title?: string;
  comment?: string;
};
