import { Metadata } from 'next';
import { ExternalLink, Star, Zap } from 'lucide-react';
import NewsletterInline from '@/components/newsletter/NewsletterInline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Recommended AI Tools — Snavionza',
  description: 'Our honest picks for the best AI writing tools, productivity apps, automation platforms, and creator tools. Personally tested and recommended.',
};

const toolCategories = [
  {
    title: 'AI Writing Tools',
    tools: [
      {
        name: 'Jasper AI',
        description: 'The leading AI copywriting tool for marketers and content creators. Excellent for long-form content, ad copy, and SEO articles.',
        badge: 'Best Overall',
        rating: 4.8,
        href: '#',
        tags: ['Writing', 'Marketing', 'SEO'],
      },
      {
        name: 'Copy.ai',
        description: 'Powerful AI writer with 90+ templates. Great for social media, email campaigns, and short-form copy.',
        badge: 'Best Value',
        rating: 4.5,
        href: '#',
        tags: ['Writing', 'Social Media'],
      },
      {
        name: 'Writesonic',
        description: 'Versatile AI content platform with SEO tools built in. Ideal for blog content and landing pages.',
        rating: 4.4,
        href: '#',
        tags: ['Writing', 'SEO'],
      },
    ],
  },
  {
    title: 'AI Productivity Tools',
    tools: [
      {
        name: 'Notion AI',
        description: 'AI-powered workspace that helps you write, summarize, brainstorm, and organize — all inside Notion.',
        badge: 'Editor\'s Pick',
        rating: 4.7,
        href: '#',
        tags: ['Productivity', 'Notes'],
      },
      {
        name: 'Otter.ai',
        description: 'AI meeting transcription and note-taking. Automatically captures and summarizes your meetings.',
        rating: 4.5,
        href: '#',
        tags: ['Productivity', 'Meetings'],
      },
    ],
  },
  {
    title: 'AI Automation & Workflows',
    tools: [
      {
        name: 'Zapier',
        description: 'Connect 5,000+ apps and automate repetitive tasks without code. The gold standard for no-code automation.',
        badge: 'Most Popular',
        rating: 4.8,
        href: '#',
        tags: ['Automation', 'No-Code'],
      },
      {
        name: 'Make (Integromat)',
        description: 'Visual automation builder with more flexibility than Zapier at a lower price. Great for complex workflows.',
        rating: 4.6,
        href: '#',
        tags: ['Automation', 'No-Code'],
      },
    ],
  },
  {
    title: 'AI SEO & Marketing Tools',
    tools: [
      {
        name: 'Surfer SEO',
        description: 'Content optimization platform that analyzes top-ranking pages and guides you to write SEO-winning articles.',
        badge: 'Best for SEO',
        rating: 4.7,
        href: '#',
        tags: ['SEO', 'Content'],
      },
      {
        name: 'Semrush',
        description: 'All-in-one digital marketing toolkit with keyword research, competitor analysis, and site auditing.',
        rating: 4.6,
        href: '#',
        tags: ['SEO', 'Marketing'],
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full mb-4">
          Affiliate-Tested
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Recommended AI Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tools we&apos;ve personally tested and recommend. Every pick is based on real-world use — not paid placement.
        </p>
      </div>

      {/* Disclosure */}
      <div className="mb-12 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
        <strong className="text-gray-800">Affiliate Disclosure:</strong> Some links on this page are affiliate links. If you purchase through our link, we earn a small commission at no extra cost to you.{' '}
        <Link href="/affiliate-disclosure" className="text-blue-600 underline">Read our full disclosure.</Link>
      </div>

      {/* Tool Categories */}
      {toolCategories.map((category) => (
        <section key={category.title} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            {category.title}
          </h2>
          <div className="space-y-5">
            {category.tools.map((tool) => (
              <div
                key={tool.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    {tool.badge && (
                      <span className="inline-block text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider mr-2 mb-2">
                        {tool.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        fill={i < Math.round(tool.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{tool.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">{tool.description}</p>

                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Try {tool.name}
                    <ExternalLink size={14} />
                  </a>
                  {tool.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center mb-12">
        <Zap size={32} className="text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Stay Updated on New Tools</h2>
        <p className="text-gray-600 mb-6">
          We regularly add new tools to this page. Subscribe to our newsletter to be the first to know.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Subscribe Free
        </Link>
      </div>

      <NewsletterInline />
    </div>
  );
}
