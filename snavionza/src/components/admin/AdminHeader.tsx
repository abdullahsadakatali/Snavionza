'use client';

import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AdminHeaderProps {
  user: User;
}

function getPageTitle(pathname: string): string {
  if (pathname === '/admin') return 'Dashboard';
  if (pathname.startsWith('/admin/articles/new')) return 'New Article';
  if (pathname.includes('/admin/articles') && pathname.includes('/edit')) return 'Edit Article';
  if (pathname.startsWith('/admin/articles')) return 'Articles';
  if (pathname.startsWith('/admin/categories')) return 'Categories';
  if (pathname.startsWith('/admin/media')) return 'Media Library';
  if (pathname.startsWith('/admin/subscribers')) return 'Subscribers';
  return 'Admin';
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 shrink-0">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/articles/new"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          New Article
        </Link>
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
          {user.email?.[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
}
