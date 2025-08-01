'use client';

import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TransactionFeeCalculatorProps {
  productPrice: number;
  serviceFeePercent?: number;
  onChange?: (data: {
    totalPrice: number;
    serviceFee: number;
    sellerAmount: number;
  }) => void;
}

export function TransactionFeeCalculator({
  productPrice,
  serviceFeePercent = 10,
  onChange,
}: TransactionFeeCalculatorProps) {
  const [calculatedFees, setCalculatedFees] = useState({
    totalPrice: productPrice,
    serviceFee: 0,
    sellerAmount: 0,
  });

  useEffect(() => {
    const serviceFee = (productPrice * serviceFeePercent) / 100;
    const sellerAmount = productPrice - serviceFee;
    
    const newFees = {
      totalPrice: productPrice,
      serviceFee,
      sellerAmount,
    };
    
    setCalculatedFees(newFees);
    
    if (onChange) {
      onChange(newFees);
    }
  }, [productPrice, serviceFeePercent, onChange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="border rounded-lg p-4 space-y-2 text-sm">
      <h4 className="font-medium mb-3">Price Details</h4>
      <div className="flex justify-between">
        <span>Product Price</span>
        <span>{formatCurrency(calculatedFees.totalPrice)}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span>Platform Fee ({serviceFeePercent}%)</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  This fee helps maintain the platform and provide secure transactions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span>{formatCurrency(calculatedFees.serviceFee)}</span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>Creator Earnings</span>
        <span>{formatCurrency(calculatedFees.sellerAmount)}</span>
      </div>
      <div className="pt-2 mt-2 border-t flex justify-between font-medium">
        <span>Total</span>
        <span>{formatCurrency(calculatedFees.totalPrice)}</span>
      </div>
    </div>
  );
}