'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  variant?: 'hero' | 'compact';
}

export default function SearchBar({ initialQuery = '', variant = 'compact' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-0 max-w-2xl mx-auto shadow-lg rounded-2xl overflow-hidden border border-gray-200 bg-white">
        <div className="flex items-center pl-5 text-gray-400">
          <Search size={22} />
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search AI tools, productivity guides..."
          className="flex-1 py-4 px-4 text-gray-900 placeholder-gray-400 text-base bg-transparent outline-none"
          aria-label="Search articles"
        />
        {query && (
          <button type="button" onClick={clear} className="px-3 text-gray-400 hover:text-gray-600" aria-label="Clear search">
            <X size={18} />
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
      <Search size={18} className="text-gray-400 shrink-0" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
        aria-label="Search articles"
      />
      {query && (
        <button type="button" onClick={clear} aria-label="Clear" className="text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      )}
    </form>
  );
}
