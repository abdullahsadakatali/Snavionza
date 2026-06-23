import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterInline from '@/components/newsletter/NewsletterInline';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Snavionza — AI Tools & Productivity Publication',
  description: 'Snavionza is a digital media publication focused on AI tools, productivity software, and automation workflows for creators and business owners.',
};

const pillars = [
  {
    icon: BookOpen,
    title: 'Honest Reviews',
    description: 'Every tool we recommend has been thoroughly researched and tested. We only share what genuinely adds value.',
  },
  {
    icon: Target,
    title: 'Practical Guides',
    description: 'Our articles focus on real-world application — not theory. Step-by-step workflows you can implement today.',
  },
  {
    icon: TrendingUp,
    title: 'Staying Current',
    description: 'AI moves fast. We update our content regularly to ensure the tools and strategies we cover remain relevant.',
  },
  {
    icon: Award,
    title: 'Editorial Integrity',
    description: 'We clearly disclose affiliate relationships. Our editorial opinions are never influenced by partnerships.',
  },
];

const topics = [
  'AI Writing Tools', 'AI Productivity', 'AI Marketing', 'AI Automation',
  'AI Tool Reviews', 'AI Comparisons', 'AI Workflows', 'Creator Tools',
  'Business Productivity', 'Student Productivity',
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <Image
          src="/logo.png"
          alt="Snavionza"
          width={200}
          height={60}
          className="h-14 w-auto mx-auto mb-8"
        />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          About Snavionza
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Snavionza is a digital media publication dedicated to helping creators, entrepreneurs, and business professionals work smarter using AI tools and productivity systems.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16 bg-blue-50 border border-blue-200 rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The AI landscape is evolving at an unprecedented pace. New tools, platforms, and workflows emerge every week — making it harder than ever for busy professionals to stay informed and make smart decisions about the technology they adopt.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Snavionza cuts through the noise. We publish carefully researched guides, honest reviews, and practical workflows that help you leverage AI without the overwhelm.
        </p>
      </section>

      {/* Editorial Pillars */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <pillar.icon size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics We Cover</h2>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <span key={topic} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* Author */}
      <section className="mb-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Snavionza Editorial</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          All content on Snavionza is published under the <strong>Snavionza Editorial</strong> brand. Our articles are thoroughly researched, drawing from hands-on tool testing, industry analysis, and extensive experience with AI-powered workflows.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We believe in transparency. When a link is an affiliate link, we say so. When a tool has real drawbacks, we include them. Our goal is to earn your long-term trust — not just a click.
        </p>
      </section>

      {/* Affiliate Note */}
      <section className="mb-16 bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-2">A Note on Affiliate Links</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Some links on Snavionza are affiliate links, which means we may earn a small commission if you sign up for a tool through our link — at no extra cost to you. This helps us keep Snavionza free and independent.
          Read our full <Link href="/affiliate-disclosure" className="text-blue-600 underline">affiliate disclosure policy</Link>.
        </p>
      </section>

      {/* Contact CTA */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Questions, feedback, or partnership inquiries? We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </section>

      <NewsletterInline />
    </div>
  );
}
