import Link from 'next/link';
import { Category } from '@/lib/types';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

// Map category slug to distinct colors
const categoryColors: Record<string, string> = {
  'ai-writing': 'bg-purple-50 text-purple-700 hover:bg-purple-100',
  'ai-productivity': 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  'ai-marketing': 'bg-pink-50 text-pink-700 hover:bg-pink-100',
  'ai-automation': 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  'ai-tool-reviews': 'bg-teal-50 text-teal-700 hover:bg-teal-100',
  'ai-comparisons': 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
  'ai-workflows': 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
  'creator-tools': 'bg-rose-50 text-rose-700 hover:bg-rose-100',
  'business-productivity': 'bg-green-50 text-green-700 hover:bg-green-100',
  'student-productivity': 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
};

const defaultColor = 'bg-blue-50 text-blue-700 hover:bg-blue-100';

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const colorClass = categoryColors[category.slug] || defaultColor;

  return (
    <div className={className}>
      <Link
        href={`/category/${category.slug}`}
        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full transition-colors ${colorClass}`}
      >
        {category.name}
      </Link>
    </div>
  );
}
