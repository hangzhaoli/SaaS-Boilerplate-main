'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Check, 
  AlertCircle, 
  ArrowRight,
  Wallet,
  Shield
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TransactionFeeCalculator } from './TransactionFeeCalculator';

import type { Product, LicenseType } from '@/types/Marketplace';

interface CheckoutSteps {
  payment: boolean;
  processing: boolean;
  complete: boolean;
}

interface CheckoutProcessProps {
  product: Product;
  licenseType: LicenseType;
  licensePrice: number;
  onComplete?: (orderId: string) => void;
  onCancel?: () => void;
}

export function CheckoutProcess({
  product,
  licenseType,
  licensePrice,
  onComplete,
  onCancel,
}: CheckoutProcessProps) {
  const router = useRouter();
  const [steps, setSteps] = useState<CheckoutSteps>({
    payment: true,
    processing: false,
    complete: false,
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  
  // 服务费率，默认为10%
  const serviceFeePercent = product.serviceFeePercent || 10;
  
  const handlePayment = async () => {
    setError(null);
    setLoading(true);
    
    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 计算服务费和卖家收益
      const serviceFee = (licensePrice * serviceFeePercent) / 100;
      const sellerAmount = licensePrice - serviceFee;
      
      // 生成订单ID
      const generatedOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setOrderId(generatedOrderId);
      
      // 更新步骤状态
      setSteps({
        payment: false,
        processing: true,
        complete: false,
      });
      
      // 模拟处理时间
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 完成处理
      setSteps({
        payment: false,
        processing: false,
        complete: true,
      });
      
      console.log('Payment successful', {
        orderId: generatedOrderId,
        product: product.id,
        licenseType,
        amount: licensePrice,
        serviceFee,
        sellerAmount,
        paymentMethod
      });
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred during payment processing. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleComplete = () => {
    if (onComplete && orderId) {
      onComplete(orderId);
    } else {
      router.push('/dashboard/orders');
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className={`flex items-center ${steps.payment ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
            steps.payment 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <CreditCard className="h-4 w-4" />
          </div>
          <span>Payment</span>
        </div>
        
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        
        <div className={`flex items-center ${steps.processing ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
            steps.processing 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <span>Processing</span>
        </div>
        
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        
        <div className={`flex items-center ${steps.complete ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
            steps.complete 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <Check className="h-4 w-4" />
          </div>
          <span>Complete</span>
        </div>
      </div>
      
      {steps.payment && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>
              You're purchasing {product.title} with a {licenseType} license
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="relative h-12 w-16 rounded overflow-hidden">
                <Image
                  src={product.thumbnailUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium line-clamp-1">{product.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {licenseType.charAt(0).toUpperCase() + licenseType.slice(1)} License
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">
                  {formatCurrency(licensePrice)}
                </div>
              </div>
            </div>
            
            <TransactionFeeCalculator
              productPrice={licensePrice}
              serviceFeePercent={serviceFeePercent}
            />
            
            <div className="space-y-2">
              <h4 className="font-medium">Payment Method</h4>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit Card</span>
                  </div>
                </div>
                
                <div
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    paymentMethod === 'wallet' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span>Wallet</span>
                  </div>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay {formatCurrency(licensePrice)}
                </>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onCancel}
              disabled={loading}
              className="w-full"
            >
              Cancel
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure payment powered by Stripe</span>
            </div>
          </CardFooter>
        </Card>
      )}
      
      {steps.processing && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <CardTitle>Processing Your Order</CardTitle>
            <CardDescription>
              Please wait while we process your payment and prepare your download...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-primary animate-progress" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                This will only take a moment
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {steps.complete && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>Purchase Complete!</CardTitle>
            <CardDescription>
              Your order has been successfully processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-1">Order Details</p>
                <p className="text-xs text-muted-foreground mb-2">Order ID: {orderId}</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-16 rounded overflow-hidden">
                    <Image
                      src={product.thumbnailUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{product.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {licenseType.charAt(0).toUpperCase() + licenseType.slice(1)} License
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  A confirmation email has been sent to your email address.
                </p>
                <p className="text-sm text-muted-foreground">
                  You can access your purchase from your orders page.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleComplete} className="w-full">
              View My Orders
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}