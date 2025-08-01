import type { ReactNode } from 'react';

import { FooterNavigation } from '@/components/FooterNavigation';
import { MarketplaceNavbar } from '@/features/marketplace/MarketplaceNavbar';

type MarketplaceLayoutProps = {
  children: ReactNode;
};

export default function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return (
    <div className="min-h-screen">
      <MarketplaceNavbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <FooterNavigation />
    </div>
  );
}
