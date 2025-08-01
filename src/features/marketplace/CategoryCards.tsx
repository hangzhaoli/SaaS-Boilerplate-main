'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ProductCategory } from '@/types/Marketplace';

interface CategoryCardsProps {
  onSelectCategory?: (category: ProductCategory) => void;
}

const categories: { 
  id: ProductCategory; 
  name: string; 
  count: number;
  imageSrc: string;
}[] = [
  { 
    id: 'ai_video', 
    name: 'AI Videos', 
    count: 3245,
    imageSrc: '/image_assets/image.png'
  },
  { 
    id: 'ai_music', 
    name: 'AI Music', 
    count: 2876,
    imageSrc: '/image_assets/image (1).png'
  },
  { 
    id: 'ai_image', 
    name: 'AI Images', 
    count: 4321,
    imageSrc: '/image_assets/image (2).png'
  },
  { 
    id: 'ai_tool', 
    name: 'AI Tools', 
    count: 876,
    imageSrc: '/image_assets/image (3).png'
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {categories.map((category) => (
        <div 
          key={category.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all"
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
          <div className="w-20 h-20 mb-4 relative">
            <Image
              src={category.imageSrc}
              alt={category.name}
              fill
              loading="lazy"
              sizes="80px"
              className="object-contain"
            />
          </div>
          <h3 className="font-medium text-center text-lg">{category.name}</h3>
          <p className="text-sm text-muted-foreground text-center">{category.count.toLocaleString()} items</p>
        </div>
      ))}
    </div>
  );
}