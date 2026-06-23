import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { label: 'AI Writing', slug: 'ai-writing' },
  { label: 'AI Productivity', slug: 'ai-productivity' },
  { label: 'AI Marketing', slug: 'ai-marketing' },
  { label: 'AI Automation', slug: 'ai-automation' },
  { label: 'AI Tool Reviews', slug: 'ai-tool-reviews' },
  { label: 'AI Comparisons', slug: 'ai-comparisons' },
  { label: 'AI Workflows', slug: 'ai-workflows' },
  { label: 'Creator Tools', slug: 'creator-tools' },
  { label: 'Business Productivity', slug: 'business-productivity' },
  { label: 'Student Productivity', slug: 'student-productivity' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Snavionza"
                width={140}
                height={40}
                className="h-9 w-auto brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your go-to source for AI tools, productivity guides, automation workflows, and creator resources.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-colors"
            >
              Subscribe Free
            </Link>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Recommended Tools</Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Newsletter</Link>
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Snavionza. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Some links may be affiliate links.{' '}
            <Link href="/affiliate-disclosure" className="text-gray-500 hover:text-blue-400 underline">
              Read our disclosure.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
