import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Snavionza',
  description: 'Read the Terms of Service for Snavionza. By using our website, you agree to these terms.',
};

export default function TermsPage() {
  const lastUpdated = 'June 23, 2025';
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {lastUpdated}</p>

      <div className="prose prose-lg max-w-none">
        <p>By accessing and using snavionza.com (the &quot;Website&quot;), you accept and agree to be bound by these Terms of Service. Please read them carefully before using our website.</p>

        <h2>Use of Website</h2>
        <p>You may use our website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Reproduce, duplicate, or copy our content without permission</li>
          <li>Use automated tools to scrape our website at scale</li>
          <li>Interfere with the proper operation of the website</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>All content on Snavionza — including articles, guides, logos, and design — is the intellectual property of Snavionza unless otherwise stated. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
        <p>You may quote brief excerpts of our articles for non-commercial purposes provided you give proper attribution and link back to the original article.</p>

        <h2>Affiliate Links & Third-Party Websites</h2>
        <p>Snavionza contains affiliate links to third-party websites and products. When you click an affiliate link and make a purchase, we may earn a commission. We are not responsible for the content, accuracy, or practices of third-party websites.</p>

        <h2>Disclaimer of Warranties</h2>
        <p>Snavionza is provided &quot;as is&quot; without any warranties of any kind. We make no representations about the accuracy, reliability, or completeness of any content on this website. The information published on Snavionza is for general informational purposes only and should not be treated as professional advice.</p>

        <h2>Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Snavionza shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or reliance on our content.</p>

        <h2>Newsletter</h2>
        <p>By subscribing to our newsletter, you agree to receive periodic emails from Snavionza. You can unsubscribe at any time. We will not sell or share your email address.</p>

        <h2>Governing Law</h2>
        <p>These Terms of Service are governed by and construed in accordance with applicable law. Any disputes shall be subject to the exclusive jurisdiction of the appropriate courts.</p>

        <h2>Changes to These Terms</h2>
        <p>We reserve the right to update these Terms of Service at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>

        <h2>Contact</h2>
        <p>If you have questions about these Terms of Service, please contact us at <a href="mailto:hello@snavionza.com">hello@snavionza.com</a>.</p>
      </div>
    </div>
  );
}
