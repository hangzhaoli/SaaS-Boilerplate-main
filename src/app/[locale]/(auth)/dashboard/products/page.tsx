'use client';

import { Edit, Eye, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProductsPage = () => {
  const [products] = useState([
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
      createdAt: '2024-01-15',
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
      createdAt: '2024-01-10',
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
      createdAt: '2024-01-05',
    },
    {
      id: 4,
      title: 'Voice Clone Tool',
      category: 'AI Voice',
      price: 39.99,
      sales: 12,
      earnings: 479.88,
      views: 650,
      status: 'draft',
      image: 'https://picsum.photos/200/150?random=4',
      createdAt: '2024-01-20',
    },
    {
      id: 5,
      title: 'Text Generator AI',
      category: 'AI Tools',
      price: 24.99,
      sales: 67,
      earnings: 1674.33,
      views: 3200,
      status: 'active',
      image: 'https://picsum.photos/200/150?random=5',
      createdAt: '2023-12-28',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your AI creations and track their performance
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {products.length}
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">Total Products</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {products.filter(p => p.status === 'active').length}
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">Active</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              $
              {products.reduce((sum, p) => sum + p.earnings, 0).toLocaleString()}
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">Total Earnings</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:border-orange-800 dark:from-orange-900/20 dark:to-red-900/20">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {products.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400">Total Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute right-2 top-2">
                <Badge
                  variant={product.status === 'active' ? 'default' : 'secondary'}
                  className={product.status === 'active'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-500 hover:bg-gray-600'}
                >
                  {product.status}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 size-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 size-4" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Price:</span>
                  <span className="font-semibold">
                    $
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Sales:</span>
                  <span className="font-semibold text-green-600">{product.sales}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Earnings:</span>
                  <span className="font-semibold text-green-600">
                    $
                    {product.earnings}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Views:</span>
                  <span className="font-semibold text-blue-600">{product.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="text-gray-600 dark:text-gray-400">{product.createdAt}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-1 size-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-1 size-3" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
