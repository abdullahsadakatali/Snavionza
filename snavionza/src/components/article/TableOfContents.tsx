'use client';

import { useState, useEffect, useCallback } from 'react';
import { TableOfContentsItem } from '@/lib/types';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  const handleScroll = useCallback(() => {
    const headingElements = items.map((item) => document.getElementById(item.id)).filter(Boolean);

    let current = '';
    for (const el of headingElements) {
      if (el && el.getBoundingClientRect().top < 120) {
        current = el.id;
      }
    }
    setActiveId(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(() => {
      handleScroll();
    }, 0);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="bg-gray-50 border border-gray-200 rounded-2xl p-5"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left font-semibold text-gray-900 mb-0"
        aria-expanded={isOpen}
      >
        <List size={18} className="text-blue-600" />
        Table of Contents
        <span className="ml-auto text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ol className="mt-4 space-y-1 list-none">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
              <a
                href={`#${item.id}`}
                className={`toc-link block py-1 text-sm leading-snug transition-colors hover:text-blue-600 ${
                  activeId === item.id
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
