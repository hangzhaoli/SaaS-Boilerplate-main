'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import {
  BarChart3,
  Heart,
  LogIn,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
  Wallet,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export function MarketplaceNavbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 实现搜索功能 - 在实际应用中，这里应该重定向到搜索结果页面
    // TODO: Implement search functionality
  };

  const handleSignOut = () => {
    signOut();
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo and Main Navigation */}
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">∞</span>
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 bg-clip-text text-2xl font-bold text-transparent">
                  ZENO
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/marketplace"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActive('/marketplace')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                Marketplace
              </Link>
              <Link
                href="/marketplace/categories"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActive('/marketplace/categories')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                Categories
              </Link>
              <Link
                href="/marketplace/featured"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActive('/marketplace/featured')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                Featured
              </Link>
              <Link
                href="/marketplace/new"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActive('/marketplace/new')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="mx-4 hidden max-w-md flex-1 items-center md:flex">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="size-4 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="∞ Search ZENO..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            </form>
          </div>

          {/* Right Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isSignedIn ? (
              <>
                {/* Favorites */}
                <Link href="/dashboard/favorites">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="size-5" />
                    <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center p-0">
                      3
                    </Badge>
                  </Button>
                </Link>

                {/* Cart */}
                <Link href="/marketplace/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="size-5" />
                    <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center p-0">
                      2
                    </Badge>
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative size-8 rounded-full">
                      <User className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName}
                          {' '}
                          {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.emailAddresses[0]?.emailAddress}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex cursor-pointer items-center">
                        <Package className="mr-2 size-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/orders" className="flex cursor-pointer items-center">
                        <ShoppingCart className="mr-2 size-4" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/wallet" className="flex cursor-pointer items-center">
                        <Wallet className="mr-2 size-4" />
                        <span>Wallet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/earnings" className="flex cursor-pointer items-center">
                        <BarChart3 className="mr-2 size-4" />
                        <span>Earnings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/organization-profile" className="flex cursor-pointer items-center">
                        <Settings className="mr-2 size-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 size-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">
                    <LogIn className="mr-2 size-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen
                ? <X className="block size-6" aria-hidden="true" />
                : <Menu className="block size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 pb-3 pt-2">
            <Link
              href="/marketplace"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                isActive('/marketplace')
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Marketplace
            </Link>
            <Link
              href="/marketplace/categories"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                isActive('/marketplace/categories')
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Categories
            </Link>
            <Link
              href="/marketplace/featured"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                isActive('/marketplace/featured')
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Featured
            </Link>
            <Link
              href="/marketplace/new"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                isActive('/marketplace/new')
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              New Arrivals
            </Link>
          </div>

          {/* Mobile Search */}
          <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
            <div className="px-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="size-4 text-gray-400" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search AI products..."
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Mobile User Menu */}
          {isSignedIn
            ? (
                <>
                  <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
                    <div className="flex items-center px-4">
                      <div className="shrink-0">
                        <User className="size-8 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                          {user?.firstName}
                          {' '}
                          {user?.lastName}
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {user?.emailAddresses[0]?.emailAddress}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/orders"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/dashboard/favorites"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        My Favorites
                      </Link>
                      <Link
                        href="/dashboard/organization-profile"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left text-base font-medium text-red-500 hover:bg-gray-100 hover:text-red-700 dark:hover:bg-gray-800"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )
            : (
                <div className="mt-3 space-y-1 px-2">
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full justify-start">
                      <LogIn className="mr-2 size-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="mt-2 block">
                    <Button className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
        </div>
      )}
    </nav>
  );
}
