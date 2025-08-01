'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { ProductCategory } from '@/types/Marketplace';

const categories: {
  id: ProductCategory;
  name: string;
  description: string;
  count: number;
  imageSrc: string;
  icon: string;
}[] = [
  {
    id: 'ai_video',
    name: 'AI Videos',
    description: 'Stunning AI-generated videos for your creative projects',
    count: 3245,
    imageSrc: '/image_assets/image.png',
    icon: '🎬',
  },
  {
    id: 'ai_music',
    name: 'AI Music',
    description: 'AI-composed music tracks and soundscapes',
    count: 2876,
    imageSrc: '/image_assets/image (1).png',
    icon: '🎵',
  },
  {
    id: 'ai_image',
    name: 'AI Images',
    description: 'Beautiful AI-generated images and artwork',
    count: 4321,
    imageSrc: '/image_assets/image (2).png',
    icon: '🖼️',
  },
  {
    id: 'ai_tool',
    name: 'AI Tools',
    description: 'Powerful AI tools to enhance your workflow',
    count: 876,
    imageSrc: '/image_assets/image (3).png',
    icon: '🛠️',
  },
  {
    id: 'ai_book',
    name: 'AI Books',
    description: 'AI-written books and literature',
    count: 542,
    imageSrc: '/image_assets/image.png',
    icon: '📚',
  },
  {
    id: 'ai_voice',
    name: 'AI Voice',
    description: 'AI-generated voice content and narration',
    count: 324,
    imageSrc: '/image_assets/image (1).png',
    icon: '🎙️',
  },
];

export default function CategoriesPage() {
  const router = useRouter();

  const handleCategoryClick = (category: ProductCategory) => {
    router.push(`/marketplace/categories/${category}`);
  };

  const totalProducts = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Browse Categories
          </h1>
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
            Discover AI-generated content across all categories
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {totalProducts.toLocaleString()}
            {' '}
            total products available
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <div
              key={category.id}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              onClick={() => handleCategoryClick(category.id)}
              role="button"
              tabIndex={0}
              aria-label={`Browse ${category.name} category with ${category.count} items`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }
              }}
            >
              {/* Category Icon & Image */}
              <div className="mb-6 flex items-center justify-between">
                <div className="text-4xl">{category.icon}</div>
                <div className="relative size-16 overflow-hidden rounded-lg">
                  <Image
                    src={category.imageSrc}
                    alt={category.name}
                    fill
                    loading="lazy"
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-lg font-semibold text-primary">
                    {category.count.toLocaleString()}
                    {' '}
                    items
                  </span>
                  <span className="text-sm text-gray-500 transition-colors group-hover:text-primary dark:text-gray-400">
                    Explore →
                  </span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Can't find what you're looking for?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
            Browse all products or use our advanced search to find exactly what you need.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/marketplace')}
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary/90"
            >
              Browse All Products
            </button>
            <button
              onClick={() => router.push('/marketplace/search')}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Advanced Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
