import { pgEnum, pgTable } from 'drizzle-orm/pg-core';
import { bigint, boolean, decimal, integer, serial, text, timestamp } from 'drizzle-orm/pg-core';

// User Schema
export const userSchema = pgTable('user', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Todo Schema
export const todoSchema = pgTable('todo', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  text: text('text').notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// AI Marketplace Schema

// Enums for AI marketplace
export const productCategoryEnum = pgEnum('product_category', [
  'ai_video',
  'ai_music',
  'ai_book',
  'ai_tool',
  'ai_image',
  'ai_voice',
]);

export const productStatusEnum = pgEnum('product_status', [
  'draft',
  'published',
  'suspended',
  'deleted',
]);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'completed',
  'cancelled',
  'refunded',
]);

export const licenseTypeEnum = pgEnum('license_type', [
  'personal',
  'commercial',
  'extended',
]);

export const transactionTypeEnum = pgEnum('transaction_type', [
  'sale',
  'purchase',
  'withdrawal',
  'refund',
  'deposit',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
  'pending',
  'completed',
  'failed',
]);

export const withdrawalStatusEnum = pgEnum('withdrawal_status', [
  'pending',
  'processing',
  'completed',
  'rejected',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'bank_transfer',
  'paypal',
  'crypto',
  'other',
]);

// User profiles extension for marketplace
export const userProfileSchema = pgTable('user_profile', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  displayName: text('display_name'),
  bio: text('bio'),
  avatar: text('avatar'),
  isSeller: boolean('is_seller').default(false),
  sellerVerified: boolean('seller_verified').default(false),
  totalSales: integer('total_sales').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  totalReviews: integer('total_reviews').default(0),
  socialLinks: text('social_links'), // JSON string
  walletBalance: decimal('wallet_balance', { precision: 10, scale: 2 }).default('0.00'),
  pendingBalance: decimal('pending_balance', { precision: 10, scale: 2 }).default('0.00'),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Product categories
export const categorySchema = pgTable('category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// AI Products
export const productSchema = pgTable('product', {
  id: serial('id').primaryKey(),
  sellerId: text('seller_id').notNull(),
  organizationId: text('organization_id'), // For team products
  title: text('title').notNull(),
  description: text('description').notNull(),
  shortDescription: text('short_description'),
  slug: text('slug').notNull().unique(),
  category: productCategoryEnum('category').notNull(),
  categoryId: integer('category_id').references(() => categorySchema.id),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('original_price', { precision: 10, scale: 2 }),
  licenseType: licenseTypeEnum('license_type').default('personal'),
  tags: text('tags'), // JSON array as string
  previewUrl: text('preview_url'),
  thumbnailUrl: text('thumbnail_url').notNull(),
  downloadUrl: text('download_url'),
  fileSize: bigint('file_size', { mode: 'number' }),
  duration: integer('duration'), // For video/audio in seconds
  dimensions: text('dimensions'), // For images/videos "1920x1080"
  aiModel: text('ai_model'), // Which AI model was used
  prompts: text('prompts'), // AI prompts used (if applicable)
  status: productStatusEnum('status').default('draft'),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  downloads: integer('downloads').default(0),
  views: integer('views').default(0),
  favorites: integer('favorites').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  reviewCount: integer('review_count').default(0),
  serviceFeePercent: decimal('service_fee_percent', { precision: 5, scale: 2 }).default('10.00'),
  metadata: text('metadata'), // JSON string for additional data
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Product files (for multiple assets per product)
export const productFileSchema = pgTable('product_file', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => productSchema.id).notNull(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(),
  fileType: text('file_type').notNull(), // 'image', 'video', 'audio', 'document'
  fileSize: bigint('file_size', { mode: 'number' }),
  isPrimary: boolean('is_primary').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Orders
export const orderSchema = pgTable('order', {
  id: serial('id').primaryKey(),
  orderId: text('order_id').notNull().unique(), // Human readable order ID
  buyerId: text('buyer_id').notNull(),
  sellerId: text('seller_id').notNull(),
  productId: integer('product_id').references(() => productSchema.id).notNull(),
  organizationId: text('organization_id'), // If buyer is organization
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD'),
  status: orderStatusEnum('status').default('pending'),
  paymentIntentId: text('payment_intent_id'), // Stripe payment intent
  licenseType: licenseTypeEnum('license_type').notNull(),
  downloadUrl: text('download_url'),
  downloadExpiry: timestamp('download_expiry', { mode: 'date' }),
  downloadCount: integer('download_count').default(0),
  maxDownloads: integer('max_downloads').default(5),
  serviceFee: decimal('service_fee', { precision: 10, scale: 2 }).notNull(),
  sellerAmount: decimal('seller_amount', { precision: 10, scale: 2 }).notNull(),
  metadata: text('metadata'), // JSON string
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Reviews and ratings
export const reviewSchema = pgTable('review', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => productSchema.id).notNull(),
  buyerId: text('buyer_id').notNull(),
  orderId: integer('order_id').references(() => orderSchema.id),
  rating: integer('rating').notNull(), // 1-5 stars
  title: text('title'),
  comment: text('comment'),
  isVerifiedPurchase: boolean('is_verified_purchase').default(false),
  isHelpful: integer('is_helpful').default(0), // Helpful votes count
  sellerResponse: text('seller_response'),
  sellerResponseAt: timestamp('seller_response_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// User favorites
export const favoriteSchema = pgTable('favorite', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  productId: integer('product_id').references(() => productSchema.id).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Product views tracking
export const productViewSchema = pgTable('product_view', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => productSchema.id).notNull(),
  userId: text('user_id'), // null for anonymous views
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Wallet transactions
export const walletTransactionSchema = pgTable('wallet_transaction', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  type: transactionTypeEnum('type').notNull(),
  status: transactionStatusEnum('status').default('pending'),
  orderId: integer('order_id').references(() => orderSchema.id),
  description: text('description').notNull(),
  metadata: text('metadata'), // JSON string
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Withdrawal requests
export const withdrawalRequestSchema = pgTable('withdrawal_request', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: withdrawalStatusEnum('status').default('pending'),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  paymentDetails: text('payment_details').notNull(), // JSON string
  processingFee: decimal('processing_fee', { precision: 10, scale: 2 }).default('0.00'),
  netAmount: decimal('net_amount', { precision: 10, scale: 2 }).notNull(),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  rejectionReason: text('rejection_reason'),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Platform earnings
export const platformEarningsSchema = pgTable('platform_earnings', {
  id: serial('id').primaryKey(),
  date: timestamp('date', { mode: 'date' }).notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).default('0.00'),
  transactionCount: integer('transaction_count').default(0),
  category: productCategoryEnum('category'),
  metadata: text('metadata'), // JSON string
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});