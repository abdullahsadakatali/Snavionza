import { Sparkles } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export default function NewsletterHero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-12 text-white text-center">
      <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        <Sparkles size={14} />
        Free Weekly Newsletter
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
        Work Smarter with AI
      </h2>
      <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
        Get the best AI tools, productivity workflows, and automation guides delivered to your inbox every week. Trusted by 1,000+ creators.
      </p>

      <div className="max-w-md mx-auto">
        <NewsletterForm
          placeholder="your@email.com"
          buttonText="Subscribe Free"
          source="homepage-hero"
        />
      </div>

      <p className="text-blue-200 text-xs mt-4">No spam. Unsubscribe anytime.</p>
    </section>
  );
}
