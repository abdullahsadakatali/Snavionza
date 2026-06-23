import { Metadata } from 'next';
import { Mail, Gift, Users, Sparkles } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter — Weekly AI Tools & Productivity Guides | Snavionza',
  description: 'Join thousands of creators getting the best AI tools, productivity workflows, and automation guides every week. Free newsletter by Snavionza.',
};

const benefits = [
  {
    icon: Sparkles,
    title: 'AI Tool Discoveries',
    description: 'Be the first to learn about new AI tools worth trying — before everyone else.',
  },
  {
    icon: Gift,
    title: 'Exclusive Workflows',
    description: 'Practical automation workflows and productivity systems you can implement immediately.',
  },
  {
    icon: Users,
    title: 'Creator Community',
    description: 'Join a growing community of creators and professionals working smarter with AI.',
  },
  {
    icon: Mail,
    title: 'Weekly, Not Daily',
    description: 'We respect your inbox. One curated email per week — no fluff, no filler.',
  },
];

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-200">
          <Mail size={14} />
          Free Weekly Newsletter
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Work Smarter with AI —<br />
          <span className="text-blue-600">Delivered to Your Inbox</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
          Every week, we send the best AI tools, productivity guides, and automation workflows straight to your inbox. Trusted by 1,000+ creators.
        </p>
      </div>

      {/* Sign up form */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-white mb-12">
        <h2 className="text-2xl font-bold mb-2">Subscribe — It&apos;s Free</h2>
        <p className="text-blue-200 mb-6">No spam. Unsubscribe anytime with one click.</p>
        <div className="bg-white rounded-2xl p-4">
          <NewsletterForm
            placeholder="Enter your email address"
            buttonText="Subscribe Free"
            source="newsletter-page"
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You&apos;ll Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <b.icon size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social proof */}
      <div className="text-center bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12">
        <div className="flex items-center justify-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-amber-400 text-xl">★</span>
          ))}
        </div>
        <p className="text-gray-700 font-medium mb-1">
          &quot;Snavionza is my go-to for AI tool recommendations. No fluff, just useful stuff.&quot;
        </p>
        <p className="text-sm text-gray-500">— A happy subscriber</p>
      </div>

      <p className="text-center text-sm text-gray-400">
        By subscribing, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-blue-600">Privacy Policy</a>.
        Unsubscribe anytime.
      </p>
    </div>
  );
}
