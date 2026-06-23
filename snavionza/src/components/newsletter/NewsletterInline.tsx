import { Mail } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export default function NewsletterInline() {
  return (
    <div className="my-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
          <Mail size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Enjoyed this article?
        </h3>
      </div>
      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        Join thousands of creators getting weekly AI tool guides, productivity tips, and automation workflows straight to their inbox.
      </p>
      <NewsletterForm
        placeholder="Enter your email address"
        buttonText="Join Free"
        source="article-inline"
      />
      <p className="text-xs text-gray-400 mt-3">No spam, ever. Unsubscribe anytime.</p>
    </div>
  );
}
