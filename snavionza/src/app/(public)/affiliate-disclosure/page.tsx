import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — Snavionza',
  description: 'Snavionza affiliate disclosure policy. Learn how we earn commissions and how it affects our editorial decisions.',
};

export default function AffiliateDisclosurePage() {
  const lastUpdated = 'June 23, 2025';
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Affiliate Disclosure</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {lastUpdated}</p>

      <div className="prose prose-lg max-w-none">
        <p>Snavionza is a participant in various affiliate marketing programs. This means that some of the links on our website are affiliate links, and we may earn a commission if you click on the link and make a qualifying purchase or sign up.</p>

        <h2>What This Means for You</h2>
        <p><strong>No extra cost to you:</strong> When you purchase through our affiliate links, you pay the same price you would pay if you went directly to the company&apos;s website. In some cases, our links may give you access to special discounts or extended trial periods.</p>

        <p><strong>We earn a small commission:</strong> The seller pays us a referral fee for sending you their way. This commission helps us cover the costs of running Snavionza and allows us to continue publishing free content.</p>

        <h2>Our Editorial Integrity</h2>
        <p>Our editorial opinions are entirely our own and are never influenced by affiliate relationships. We research and test products independently and only recommend tools we genuinely believe are valuable.</p>

        <p>We will never:</p>
        <ul>
          <li>Recommend a product solely because it offers a high commission</li>
          <li>Hide negative aspects of a product to protect an affiliate relationship</li>
          <li>Accept money for positive reviews</li>
          <li>Misrepresent the features or pricing of any product</li>
        </ul>

        <h2>How to Identify Affiliate Links</h2>
        <p>Affiliate links on Snavionza are typically found in:</p>
        <ul>
          <li>Our <a href="/tools">Recommended Tools</a> page</li>
          <li>Tool review articles</li>
          <li>Product comparison articles</li>
          <li>&quot;Recommended Tool&quot; boxes within articles</li>
        </ul>
        <p>We also include a brief affiliate disclosure notice at the top of articles that contain affiliate links.</p>

        <h2>Affiliate Programs We Participate In</h2>
        <p>We participate in affiliate programs from various companies including, but not limited to, AI writing tools, productivity software, SEO tools, automation platforms, and other SaaS companies. The specific programs may change over time as we evaluate new tools.</p>

        <h2>FTC Compliance</h2>
        <p>This disclosure is in accordance with the Federal Trade Commission&apos;s guidelines on endorsements and testimonials: <a href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">FTC Endorsement Guidelines</a>.</p>

        <h2>Questions</h2>
        <p>If you have any questions about our affiliate relationships or how we evaluate products, please contact us at <a href="mailto:hello@snavionza.com">hello@snavionza.com</a>.</p>
      </div>
    </div>
  );
}
