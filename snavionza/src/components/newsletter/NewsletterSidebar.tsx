import { NewsletterForm } from './NewsletterForm';

export default function NewsletterSidebar() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
      <h3 className="text-base font-bold text-gray-900 mb-2">
        📬 Free Newsletter
      </h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Weekly AI tools, productivity guides, and workflows. No spam.
      </p>
      <NewsletterForm
        placeholder="Your email"
        buttonText="Subscribe"
        source="article-sidebar"
      />
    </div>
  );
}
