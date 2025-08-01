'use client';

import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download, TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react';

import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PlatformEarnings, ProductCategory } from '@/types/Marketplace';

// Mock data for demonstration
const mockPlatformEarnings: PlatformEarnings = {
  totalServiceFees: 5250.75,
  dailyEarnings: {
    '2024-07-01': 125.98 * 0.1,
    '2024-07-02': 89.99 * 0.1,
    '2024-07-03': 0,
    '2024-07-04': 149.97 * 0.1,
    '2024-07-05': 29.99 * 0.1,
    '2024-07-06': 59.98 * 0.1,
    '2024-07-07': 0,
    '2024-07-08': 199.99 * 0.1,
    '2024-07-09': 49.99 * 0.1,
    '2024-07-10': 79.98 * 0.1,
    '2024-07-11': 0,
    '2024-07-12': 39.99 * 0.1,
    '2024-07-13': 0,
    '2024-07-14': 99.99 * 0.1,
    '2024-07-15': 129.98 * 0.1,
    '2024-07-16': 0,
    '2024-07-17': 59.99 * 0.1,
    '2024-07-18': 19.99 * 0.1,
    '2024-07-19': 0,
    '2024-07-20': 149.99 * 0.1,
    '2024-07-21': 0,
    '2024-07-22': 79.98 * 0.1,
    '2024-07-23': 29.99 * 0.1,
    '2024-07-24': 0,
    '2024-07-25': 119.97 * 0.1,
    '2024-07-26': 49.99 * 0.1,
    '2024-07-27': 12.99 * 0.1,
    '2024-07-28': 29.99 * 0.1,
    '2024-07-29': 0,
    '2024-07-30': 0,
  },
  categoryEarnings: {
    'ai_video': 1250.75 * 0.1,
    'ai_music': 750.50 * 0.1,
    'ai_image': 550.25 * 0.1,
    'ai_book': 350.00 * 0.1,
    'ai_tool': 299.99 * 0.1,
    'ai_voice': 49.99 * 0.1,
  },
  monthlySummary: {
    '2024-01': 450.75 * 0.1,
    '2024-02': 325.50 * 0.1,
    '2024-03': 580.25 * 0.1,
    '2024-04': 675.00 * 0.1,
    '2024-05': 890.75 * 0.1,
    '2024-06': 1050.25 * 0.1,
    '2024-07': 1500.50 * 0.1,
  },
};

// 交易量数据
const transactionVolumeData = {
  '2024-01': 450.75 * 10,
  '2024-02': 325.50 * 10,
  '2024-03': 580.25 * 10,
  '2024-04': 675.00 * 10,
  '2024-05': 890.75 * 10,
  '2024-06': 1050.25 * 10,
  '2024-07': 1500.50 * 10,
};

// 卖家数据
const topSellers = [
  { id: 1, name: 'John Creator', sales: 1250.75, fees: 125.08, products: 12 },
  { id: 2, name: 'Alice Designer', sales: 980.50, fees: 98.05, products: 8 },
  { id: 3, name: 'Bob AI Expert', sales: 750.25, fees: 75.03, products: 5 },
  { id: 4, name: 'Emma Musician', sales: 625.99, fees: 62.60, products: 4 },
  { id: 5, name: 'David Illustrator', sales: 590.50, fees: 59.05, products: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function PlatformEarningsPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly'>('monthly');
  const [earnings] = useState<PlatformEarnings>(mockPlatformEarnings);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Prepare data for charts
  const dailyData = Object.entries(earnings.dailyEarnings).map(([date, amount]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    earnings: amount,
    volume: amount * 10, // 总交易额是服务费的10倍（假设服务费为10%）
  })).slice(-14); // Last 14 days
  
  const monthlyData = Object.entries(earnings.monthlySummary).map(([month, amount]) => {
    const [year, monthNum] = month.split('-');
    return {
      month: new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      earnings: amount,
      volume: amount * 10, // 总交易额是服务费的10倍（假设服务费为10%）
    };
  });
  
  const categoryData = Object.entries(earnings.categoryEarnings).map(([category, amount]) => ({
    name: category.replace('ai_', '').replace('_', ' ').toUpperCase(),
    value: amount,
  }));
  
  // 计算总交易额
  const totalTransactionVolume = Object.values(transactionVolumeData).reduce((sum, val) => sum + val, 0);
  
  // 计算平台总收入
  const platformTotalRevenue = earnings.totalServiceFees;
  
  // 计算平台费率
  const platformFeeRate = 10; // 10%
  
  return (
    <>
      <TitleBar title="Platform Earnings Dashboard" />
      
      <DashboardSection>
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Platform Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatCurrency(platformTotalRevenue)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {platformFeeRate}% transaction fees
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Transaction Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatCurrency(totalTransactionVolume)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Gross marketplace volume
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Sellers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    42
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  With at least one sale
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
                  <div className="text-2xl font-bold">
                    156
                  </div>
                  <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active listings
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <Select
                    value={timeframe}
                    onValueChange={(value) => setTimeframe(value as 'daily' | 'monthly')}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              <CardDescription>
                Platform revenue from {platformFeeRate}% transaction fees
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeframe === 'daily' ? dailyData : monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeframe === 'daily' ? 'date' : 'month'} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="earnings" name="Platform Revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Transaction Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>
                Total transaction volume over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeframe === 'daily' ? dailyData : monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeframe === 'daily' ? 'date' : 'month'} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Line type="monotone" dataKey="volume" name="Transaction Volume" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>
                  Distribution of platform revenue across different AI product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Sellers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Sellers</CardTitle>
                <CardDescription>
                  Sellers generating the most revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seller</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead className="text-right">Platform Fees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell className="font-medium">{seller.name}</TableCell>
                        <TableCell>{seller.products}</TableCell>
                        <TableCell>{formatCurrency(seller.sales)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(seller.fees)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          {/* Platform Fee Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Fee Analysis</CardTitle>
              <CardDescription>
                Revenue generated from transaction fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Total Transaction Volume</h4>
                    <p className="text-sm text-muted-foreground">Gross marketplace sales</p>
                  </div>
                  <div className="text-xl font-bold">{formatCurrency(totalTransactionVolume)}</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-medium">Platform Fee Rate</h4>
                    <p className="text-sm text-muted-foreground">Standard fee applied to all transactions</p>
                  </div>
                  <div className="text-xl font-bold">{platformFeeRate}%</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div>
                    <h4 className="font-medium">Platform Revenue</h4>
                    <p className="text-sm text-muted-foreground">Total earnings from transaction fees</p>
                  </div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(platformTotalRevenue)}</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div>
                    <h4 className="font-medium">Seller Earnings</h4>
                    <p className="text-sm text-muted-foreground">Total amount paid to sellers</p>
                  </div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalTransactionVolume - platformTotalRevenue)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>
    </>
  );
}