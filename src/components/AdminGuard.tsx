'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 管理员邮箱列表 - 在实际应用中，这应该存储在数据库中
const ADMIN_EMAILS = [
  'admin@zeno.com',
  'lihangzhao2016@gmail.com', // ✅ 已配置您的邮箱
  // 添加更多管理员邮箱
];

type AdminGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsChecking(false);

      // 如果未登录，重定向到登录页
      if (!isSignedIn) {
        router.push('/sign-in?redirect=/admin');
        return;
      }

      // 检查是否为管理员
      const userEmail = user?.emailAddresses[0]?.emailAddress;
      const isAdmin = userEmail && ADMIN_EMAILS.includes(userEmail);

      if (!isAdmin) {
        // 非管理员用户，重定向到 dashboard
        router.push('/dashboard');
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // 加载中状态
  if (isChecking || !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">🔐 验证管理员权限</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2">
              <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span>正在验证访问权限...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 未登录状态
  if (!isSignedIn) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-red-600">❌ 访问被拒绝</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              请先登录以访问管理员面板
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 检查管理员权限
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const isAdmin = userEmail && ADMIN_EMAILS.includes(userEmail);

  if (!isAdmin) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-red-600">🚫 权限不足</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                您没有访问管理员面板的权限
              </p>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm">
                  <strong>当前用户:</strong>
                  {' '}
                  {userEmail}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  如需管理员权限，请联系系统管理员
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 管理员用户，显示内容
  return <>{children}</>;
}

// 检查是否为管理员的 Hook
export function useIsAdmin() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn || !user) {
    return false;
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;
  return userEmail && ADMIN_EMAILS.includes(userEmail);
}
