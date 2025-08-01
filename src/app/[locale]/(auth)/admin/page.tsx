'use client';

import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  Download,
  Eye,
  Package,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { AdminGuard } from '@/components/AdminGuard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Order, Product, UserProfile } from '@/types/Marketplace';

// Mock admin data - In real app, this would come from admin API
const adminStats = {
  totalUsers: 15420,
  totalProducts: 12547,
  totalOrders: 8934,
  totalRevenue: 234567.89,
  pendingReviews: 45,
  flaggedContent: 12,
  monthlyGrowth: 15.3,
  conversionRate: 3.2,
};

const recentOrders: (Order & { productTitle: string; buyerName: string; sellerName: string })[] = [
  {
    id: 1,
    orderId: 'ORD-2024-001',
    buyerId: 'user_buyer_1',
    sellerId: 'user_seller_1',
    productId: 1,
    amount: '29.99',
    currency: 'USD',
    status: 'completed',
    licenseType: 'commercial',
    downloadCount: 1,
    maxDownloads: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
    productTitle: 'Epic Fantasy Battle Scene',
    buyerName: 'John Doe',
    sellerName: 'FantasyCreator',
  },
  {
    id: 2,
    orderId: 'ORD-2024-002',
    buyerId: 'user_buyer_2',
    sellerId: 'user_seller_2',
    productId: 2,
    amount: '9.99',
    currency: 'USD',
    status: 'pending',
    licenseType: 'personal',
    downloadCount: 0,
    maxDownloads: 3,
    updatedAt: new Date(),
    createdAt: new Date(),
    productTitle: 'Ambient Space Music',
    buyerName: 'Jane Smith',
    sellerName: 'SoundWave AI',
  },
];

const topProducts: (Product & { totalRevenue: number })[] = [
  {
    id: 1,
    sellerId: 'user_1',
    title: 'Epic Fantasy Battle Scene - AI Generated 4K Video',
    description: 'A stunning 4K AI-generated video...',
    slug: 'epic-fantasy-battle-scene',
    category: 'ai_video',
    price: '29.99',
    licenseType: 'commercial',
    thumbnailUrl: 'https://picsum.photos/800/450?random=1',
    status: 'published',
    isActive: true,
    isFeatured: true,
    downloads: 1234,
    views: 5678,
    favorites: 89,
    rating: '4.8',
    reviewCount: 156,
    updatedAt: new Date(),
    createdAt: new Date(),
    totalRevenue: 36987.66,
  },
];

const topSellers: (UserProfile & { monthlyRevenue: number })[] = [
  {
    id: 1,
    userId: 'user_1',
    displayName: 'FantasyCreator',
    bio: 'Professional AI video creator',
    isSeller: true,
    sellerVerified: true,
    totalSales: 156,
    rating: '4.9',
    totalReviews: 87,
    updatedAt: new Date(),
    createdAt: new Date(),
    monthlyRevenue: 12450.00,
  },
];

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'users' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            🔧 ZENO Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive marketplace management and analytics
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex space-x-1 rounded-lg bg-muted p-1">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'products', label: '📦 Products' },
            { id: 'orders', label: '🛒 Orders' },
            { id: 'users', label: '👥 Users' },
            { id: 'analytics', label: '📈 Analytics' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                    <Users className="size-5 text-blue-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +
                    {adminStats.monthlyGrowth}
                    % from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{adminStats.totalProducts.toLocaleString()}</div>
                    <Package className="size-5 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active marketplace listings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{adminStats.totalOrders.toLocaleString()}</div>
                    <TrendingUp className="size-5 text-purple-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {adminStats.conversionRate}
                    % conversion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{formatCurrency(adminStats.totalRevenue)}</div>
                    <DollarSign className="size-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Platform commission included
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest transactions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{order.productTitle}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.buyerName}
                            {' '}
                            →
                            {order.sellerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(Number.parseFloat(order.amount))}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Best selling products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map(product => (
                      <div key={product.id} className="flex items-center space-x-4">
                        <img
                          src={product.thumbnailUrl}
                          alt={product.title}
                          className="size-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{product.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Download className="mr-1 size-3" />
                              {product.downloads}
                            </span>
                            <span className="flex items-center">
                              <Star className="mr-1 size-3" />
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(product.totalRevenue)}</p>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Items */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 size-5 text-yellow-500" />
                    Pending Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.pendingReviews}</div>
                  <p className="text-sm text-muted-foreground">Reviews awaiting moderation</p>
                  <Button className="mt-2" size="sm" variant="outline">
                    Review Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 size-5 text-red-500" />
                    Flagged Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.flaggedContent}</div>
                  <p className="text-sm text-muted-foreground">Content requiring attention</p>
                  <Button className="mt-2" size="sm" variant="outline">
                    Investigate
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 size-5 text-green-500" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-sm text-muted-foreground">All systems operational</p>
                  <Button className="mt-2" size="sm" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button>Export Data</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>Manage all marketplace products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Downloads</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <img
                                src={product.thumbnailUrl}
                                alt={product.title}
                                className="size-10 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{product.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  ID:
                                  {product.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                          <td className="p-2">
                            $
                            {product.price}
                          </td>
                          <td className="p-2">{product.downloads}</td>
                          <td className="p-2">
                            <Badge className={product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {product.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Eye className="size-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button>Export Orders</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Complete transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Order ID</th>
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">Buyer</th>
                        <th className="p-2 text-left">Seller</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="p-2 font-mono text-sm">{order.orderId}</td>
                          <td className="p-2">{order.productTitle}</td>
                          <td className="p-2">{order.buyerName}</td>
                          <td className="p-2">{order.sellerName}</td>
                          <td className="p-2">{formatCurrency(Number.parseFloat(order.amount))}</td>
                          <td className="p-2">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-2">{order.createdAt.toLocaleDateString()}</td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Eye className="size-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                Refund
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button>Export Users</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Sellers</CardTitle>
                <CardDescription>Most successful creators on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellers.map(seller => (
                    <div key={seller.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-white">
                          {seller.displayName?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-medium">{seller.displayName}</p>
                          <p className="text-sm text-muted-foreground">
                            {seller.totalSales}
                            {' '}
                            sales •
                            {seller.rating}
                            ⭐ (
                            {seller.totalReviews}
                            {' '}
                            reviews)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(seller.monthlyRevenue)}</p>
                        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Financial performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-bold">{formatCurrency(adminStats.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Commission (10%)</span>
                      <span className="font-bold">{formatCurrency(adminStats.totalRevenue * 0.1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Creator Earnings</span>
                      <span className="font-bold">{formatCurrency(adminStats.totalRevenue * 0.9)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>Platform growth indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Monthly Growth</span>
                      <span className="font-bold text-green-600">
                        +
                        {adminStats.monthlyGrowth}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate</span>
                      <span className="font-bold">
                        {adminStats.conversionRate}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-bold">{formatCurrency(adminStats.totalRevenue / adminStats.totalOrders)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
