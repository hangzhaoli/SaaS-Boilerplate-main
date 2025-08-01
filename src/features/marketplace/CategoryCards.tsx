'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { ProductCategory } from '@/types/Marketplace';

type CategoryCardsProps = {
  onSelectCategory?: (category: ProductCategory) => void;
};

const categories: {
  id: ProductCategory;
  name: string;
  count: number;
  imageSrc: string;
  icon: string;
  color: string;
}[] = [
  {
    id: 'ai_video',
    name: 'AI Videos',
    count: 3245,
    imageSrc: '/image_assets/image.png',
    icon: '🎬',
    color: 'from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20',
  },
  {
    id: 'ai_music',
    name: 'AI Music',
    count: 2876,
    imageSrc: '/image_assets/image (1).png',
    icon: '🎵',
    color: 'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
  },
  {
    id: 'ai_image',
    name: 'AI Images',
    count: 4321,
    imageSrc: '/image_assets/image (2).png',
    icon: '🖼️',
    color: 'from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20',
  },
  {
    id: 'ai_tool',
    name: 'AI Tools',
    count: 876,
    imageSrc: '/image_assets/image (3).png',
    icon: '🛠️',
    color: 'from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20',
  },
];

export function CategoryCards({ onSelectCategory }: CategoryCardsProps) {
  const router = useRouter();

  const handleCategoryClick = (category: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      router.push(`/marketplace/categories/${category}`);
    }
  };

  return (
    <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
      {categories.map(category => (
        <div
          key={category.id}
          className={`group bg-gradient-to-br ${category.color} flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-purple-200 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:shadow-xl dark:border-purple-800 dark:hover:border-purple-600`}
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
          {/* Image */}
          <div className="relative mb-4 size-20 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={category.imageSrc}
              alt={category.name}
              fill
              loading="lazy"
              sizes="80px"
              className="rounded-lg object-contain"
            />
          </div>

          <h3 className="text-center text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300">
            {category.name}
          </h3>
          <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            ∞
            {' '}
            {category.count.toLocaleString()}
            {' '}
            items
          </p>
        </div>
      ))}
    </div>
  );
}
