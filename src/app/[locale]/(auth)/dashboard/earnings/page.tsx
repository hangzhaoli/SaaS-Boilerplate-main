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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign } from 'lucide-react';

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

import type { SellerEarnings, ProductCategory } from '@/types/Marketplace';

// Mock data for demonstration
const mockEarnings: SellerEarnings = {
  userId: 'user_1',
  totalSales: 3250.75,
  totalEarnings: 2925.68,
  pendingEarnings: 150.00,
  withdrawnEarnings: 2000.00,
  serviceFeesPaid: 325.07,
  dailySales: {
    '2024-07-01': 125.98,
    '2024-07-02': 89.99,
    '2024-07-03': 0,
    '2024-07-04': 149.97,
    '2024-07-05': 29.99,
    '2024-07-06': 59.98,
    '2024-07-07': 0,
    '2024-07-08': 199.99,
    '2024-07-09': 49.99,
    '2024-07-10': 79.98,
    '2024-07-11': 0,
    '2024-07-12': 39.99,
    '2024-07-13': 0,
    '2024-07-14': 99.99,
    '2024-07-15': 129.98,
    '2024-07-16': 0,
    '2024-07-17': 59.99,
    '2024-07-18': 19.99,
    '2024-07-19': 0,
    '2024-07-20': 149.99,
    '2024-07-21': 0,
    '2024-07-22': 79.98,
    '2024-07-23': 29.99,
    '2024-07-24': 0,
    '2024-07-25': 119.97,
    '2024-07-26': 49.99,
    '2024-07-27': 12.99,
    '2024-07-28': 29.99,
    '2024-07-29': 0,
    '2024-07-30': 0,
  },
  categorySales: {
    'ai_video': 1250.75,
    'ai_music': 750.50,
    'ai_image': 550.25,
    'ai_book': 350.00,
    'ai_tool': 299.99,
    'ai_voice': 49.99,
  },
  monthlySummary: {
    '2024-01': 450.75,
    '2024-02': 325.50,
    '2024-03': 580.25,
    '2024-04': 675.00,
    '2024-05': 890.75,
    '2024-06': 1050.25,
    '2024-07': 1500.50,
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function EarningsPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly'>('daily');
  const [earnings] = useState<SellerEarnings>(mockEarnings);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Prepare data for charts
  const dailyData = Object.entries(earnings.dailySales).map(([date, amount]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount,
  })).slice(-14); // Last 14 days
  
  const monthlyData = Object.entries(earnings.monthlySummary).map(([month, amount]) => {
    const [year, monthNum] = month.split('-');
    return {
      month: new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      amount,
    };
  });
  
  const categoryData = Object.entries(earnings.categorySales).map(([category, amount]) => ({
    name: category.replace('ai_', '').replace('_', ' ').toUpperCase(),
    value: amount,
  }));
  
  const serviceFeePercent = 10; // 10% platform fee
  
  return (
    <>
      <TitleBar title="Earnings Dashboard" />
      
      <DashboardSection>
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatCurrency(earnings.totalEarnings)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  After {serviceFeePercent}% platform fees
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatCurrency(earnings.totalSales)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total transaction volume
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Platform Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatCurrency(earnings.serviceFeesPaid)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <span className="text-orange-500 font-bold">{serviceFeePercent}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total fees paid to platform
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatCurrency(earnings.pendingEarnings)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Available in 7 days
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales Overview</CardTitle>
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
                {timeframe === 'daily' ? 'Your sales over the last 14 days' : 'Your monthly sales summary'}
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
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>
                Distribution of your sales across different AI product categories
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
          
          {/* Platform Fee Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Fee Breakdown</CardTitle>
              <CardDescription>
                Understanding how platform fees are calculated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Total Sales</h4>
                    <p className="text-sm text-muted-foreground">Gross transaction volume</p>
                  </div>
                  <div className="text-xl font-bold">{formatCurrency(earnings.totalSales)}</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-medium">Platform Fee ({serviceFeePercent}%)</h4>
                    <p className="text-sm text-muted-foreground">Fee for using the marketplace</p>
                  </div>
                  <div className="text-xl font-bold text-red-500">-{formatCurrency(earnings.serviceFeesPaid)}</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div>
                    <h4 className="font-medium">Your Earnings</h4>
                    <p className="text-sm text-muted-foreground">Net amount after fees</p>
                  </div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(earnings.totalEarnings)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>
    </>
  );
}