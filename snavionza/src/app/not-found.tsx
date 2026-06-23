import Link from 'next/link';
import { Home, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-black text-blue-100 mb-2 select-none">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Home size={18} />
            Back to Homepage
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <BookOpen size={18} />
            Browse Articles
          </Link>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <p className="text-sm font-semibold text-gray-700 mb-3">Popular destinations</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Blog', href: '/blog' },
              { label: 'AI Tools', href: '/category/ai-tool-reviews' },
              { label: 'Recommended Tools', href: '/tools' },
              { label: 'Newsletter', href: '/newsletter' },
              { label: 'About', href: '/about' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 bg-white border border-gray-200 text-sm text-gray-600 rounded-full hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
