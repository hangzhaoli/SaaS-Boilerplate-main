import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WalletOverview() {
  const walletData = {
    balance: 1250.75,
    pendingEarnings: 150.00,
    totalEarnings: 3250.75,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {formatCurrency(walletData.balance)}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <Wallet className="size-5 text-green-500" />
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Ready to withdraw
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
              {formatCurrency(walletData.pendingEarnings)}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
              <DollarSign className="size-5 text-orange-500" />
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Available in 7 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {formatCurrency(walletData.totalEarnings)}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
              <TrendingUp className="size-5 text-blue-500" />
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            All time earnings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
