'use client';

import { BarChart3, DollarSign, Download, Eye, Heart, Package, Plus, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardIndexPage = () => {
  const [stats] = useState({
    totalProducts: 12,
    totalSales: 347,
    totalEarnings: 2840.50,
    totalViews: 15420,
    monthlyGrowth: 23.5,
    favoriteCount: 89,
  });

  const [recentProducts] = useState([
    {
      id: 1,
      title: 'AI Video Generator Pro',
      category: 'AI Video',
      price: 49.99,
      sales: 23,
      earnings: 1149.77,
      views: 1240,
      status: 'active',
      image: 'https://picsum.photos/200/150?random=1',
    },
    {
      id: 2,
      title: 'Music Creation Suite',
      category: 'AI Music',
      price: 29.99,
      sales: 18,
      earnings: 539.82,
      views: 890,
      status: 'active',
      image: 'https://picsum.photos/200/150?random=2',
    },
    {
      id: 3,
      title: 'Digital Art Pack',
      category: 'AI Images',
      price: 19.99,
      sales: 45,
      earnings: 899.55,
      views: 2100,
      status: 'active',
      image: 'https://picsum.photos/200/150?random=3',
    },
  ]);

  const [recentActivity] = useState([
    { type: 'sale', product: 'AI Video Generator Pro', amount: 49.99, time: '2 hours ago' },
    { type: 'view', product: 'Music Creation Suite', count: 15, time: '4 hours ago' },
    { type: 'favorite', product: 'Digital Art Pack', count: 3, time: '6 hours ago' },
    { type: 'sale', product: 'Music Creation Suite', amount: 29.99, time: '1 day ago' },
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Welcome back, Hanz Lee!</h1>
            <p className="text-xl opacity-90">∞ Manage your infinite possibilities</p>
            <p className="mt-2 text-sm opacity-75">You have 3 active products and $2,840.50 ready to withdraw</p>
          </div>
          <div className="text-6xl opacity-20">∞</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Products</CardTitle>
            <Package className="size-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.totalProducts}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Active listings</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Sales</CardTitle>
            <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.totalSales}</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              +
              {stats.monthlyGrowth}
              % this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Earnings</CardTitle>
            <DollarSign className="size-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              $
              {stats.totalEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:border-orange-800 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Total Views</CardTitle>
            <Eye className="size-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              {stats.favoriteCount}
              {' '}
              favorites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="size-5 text-purple-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/products/new">
              <Button className="h-auto w-full flex-col gap-2 bg-gradient-to-r from-purple-600 to-pink-600 p-6 hover:from-purple-700 hover:to-pink-700">
                <Plus className="size-8" />
                <span className="text-lg font-semibold">Upload Product</span>
                <span className="text-sm opacity-90">Add new AI creation</span>
              </Button>
            </Link>

            <Link href="/dashboard/orders">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 border-blue-200 p-6 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20">
                <Download className="size-8 text-blue-600" />
                <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">View Orders</span>
                <span className="text-sm text-blue-600 dark:text-blue-400">Check recent sales</span>
              </Button>
            </Link>

            <Link href="/dashboard/wallet">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 border-green-200 p-6 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20">
                <DollarSign className="size-8 text-green-600" />
                <span className="text-lg font-semibold text-green-700 dark:text-green-300">Withdraw</span>
                <span className="text-sm text-green-600 dark:text-green-400">Cash out earnings</span>
              </Button>
            </Link>

            <Link href="/dashboard/earnings">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 border-orange-200 p-6 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20">
                <BarChart3 className="size-8 text-orange-600" />
                <span className="text-lg font-semibold text-orange-700 dark:text-orange-300">Analytics</span>
                <span className="text-sm text-orange-600 dark:text-orange-400">View detailed stats</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="size-5 text-purple-600" />
                Your Products
              </span>
              <Link href="/dashboard/products">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProducts.map(product => (
              <div key={product.id} className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="size-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <DollarSign className="size-3" />
                      $
                      {product.earnings}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <TrendingUp className="size-3" />
                      {product.sales}
                      {' '}
                      sales
                    </span>
                    <span className="flex items-center gap-1 text-orange-600">
                      <Eye className="size-3" />
                      {product.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5 text-purple-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                <div className={`flex size-10 items-center justify-center rounded-full ${
                  activity.type === 'sale'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                    : activity.type === 'view'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                      : 'bg-pink-100 text-pink-600 dark:bg-pink-900/20'
                }`}
                >
                  {activity.type === 'sale' && <DollarSign className="size-5" />}
                  {activity.type === 'view' && <Eye className="size-5" />}
                  {activity.type === 'favorite' && <Heart className="size-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {activity.type === 'sale' && `New sale: $${activity.amount}`}
                    {activity.type === 'view' && `${activity.count} new views`}
                    {activity.type === 'favorite' && `${activity.count} new favorites`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.product}
                    {' '}
                    •
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5 text-purple-600" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-4 size-12 text-gray-400" />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Performance Chart</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Coming soon - Advanced analytics and insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardIndexPage;
