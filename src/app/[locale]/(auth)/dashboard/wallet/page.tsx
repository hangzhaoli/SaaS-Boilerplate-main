'use client';

import { useState } from 'react';

import { WalletOverview } from '@/features/dashboard/WalletOverview';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { TitleBar } from '@/features/dashboard/TitleBar';

import type { UserProfile, WalletTransaction } from '@/types/Marketplace';

// Mock data for demonstration
const mockUserProfile: UserProfile = {
  id: 1,
  userId: 'user_1',
  displayName: 'John Creator',
  bio: 'AI content creator specializing in music and images',
  avatar: 'https://picsum.photos/100/100?random=1',
  isSeller: true,
  sellerVerified: true,
  totalSales: 1250.75,
  rating: '4.8',
  totalReviews: 32,
  socialLinks: '{}',
  walletBalance: 825.50,
  pendingBalance: 150.00,
  updatedAt: new Date(),
  createdAt: new Date(),
};

const mockTransactions: WalletTransaction[] = [
  {
    id: 1,
    userId: 'user_1',
    amount: '29.99',
    type: 'sale',
    status: 'completed',
    orderId: 1,
    description: 'Sale: Epic Fantasy Battle Scene',
    updatedAt: new Date('2024-07-28T15:30:00'),
    createdAt: new Date('2024-07-28T15:30:00'),
  },
  {
    id: 2,
    userId: 'user_1',
    amount: '12.99',
    type: 'sale',
    status: 'completed',
    orderId: 2,
    description: 'Sale: Ambient Space Music',
    updatedAt: new Date('2024-07-27T10:15:00'),
    createdAt: new Date('2024-07-27T10:15:00'),
  },
  {
    id: 3,
    userId: 'user_1',
    amount: '100.00',
    type: 'withdrawal',
    status: 'completed',
    description: 'Withdrawal to bank account',
    updatedAt: new Date('2024-07-25T14:20:00'),
    createdAt: new Date('2024-07-25T14:20:00'),
  },
  {
    id: 4,
    userId: 'user_1',
    amount: '49.99',
    type: 'purchase',
    status: 'completed',
    orderId: 3,
    description: 'Purchase: Cyberpunk City Generator',
    updatedAt: new Date('2024-07-22T09:45:00'),
    createdAt: new Date('2024-07-22T09:45:00'),
  },
  {
    id: 5,
    userId: 'user_1',
    amount: '15.99',
    type: 'refund',
    status: 'completed',
    orderId: 4,
    description: 'Refund: AI Voice Pack',
    updatedAt: new Date('2024-07-20T16:30:00'),
    createdAt: new Date('2024-07-20T16:30:00'),
  },
  {
    id: 6,
    userId: 'user_1',
    amount: '200.00',
    type: 'deposit',
    status: 'completed',
    description: 'Deposit from credit card',
    updatedAt: new Date('2024-07-18T11:20:00'),
    createdAt: new Date('2024-07-18T11:20:00'),
  },
  {
    id: 7,
    userId: 'user_1',
    amount: '75.00',
    type: 'withdrawal',
    status: 'pending',
    description: 'Withdrawal to PayPal',
    updatedAt: new Date('2024-07-29T13:10:00'),
    createdAt: new Date('2024-07-29T13:10:00'),
  },
];

export default function WalletPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(mockTransactions);
  
  const handleWithdraw = async (amount: number) => {
    // In a real app, this would call your API
    console.log('Withdrawing:', amount);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update user profile and add transaction
    setUserProfile(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
    }));
    
    const newTransaction: WalletTransaction = {
      id: Math.max(...transactions.map(t => t.id)) + 1,
      userId: userProfile.userId,
      amount: amount.toFixed(2),
      type: 'withdrawal',
      status: 'pending',
      description: 'Withdrawal request',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const handleDeposit = async (amount: number) => {
    // In a real app, this would call your API
    console.log('Depositing:', amount);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update user profile and add transaction
    setUserProfile(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));
    
    const newTransaction: WalletTransaction = {
      id: Math.max(...transactions.map(t => t.id)) + 1,
      userId: userProfile.userId,
      amount: amount.toFixed(2),
      type: 'deposit',
      status: 'completed',
      description: 'Deposit to wallet',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <>
      <TitleBar title="Wallet & Transactions" />
      
      <DashboardSection>
        <WalletOverview
          userProfile={userProfile}
          recentTransactions={transactions}
          onWithdraw={handleWithdraw}
          onDeposit={handleDeposit}
        />
      </DashboardSection>
    </>
  );
}