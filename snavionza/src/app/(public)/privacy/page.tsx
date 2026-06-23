import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Snavionza',
  description: 'Read the Snavionza Privacy Policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  const lastUpdated = 'June 23, 2025';
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {lastUpdated}</p>

      <div className="prose prose-lg max-w-none">
        <p>Snavionza (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website snavionza.com. This Privacy Policy describes how we collect, use, and share information about you when you visit our website.</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as:</p>
        <ul>
          <li><strong>Newsletter subscriptions:</strong> Your email address when you subscribe to our newsletter.</li>
          <li><strong>Contact form submissions:</strong> Your name, email address, subject, and message when you contact us.</li>
        </ul>
        <p>We also automatically collect certain information when you visit our website, including:</p>
        <ul>
          <li>Log data (IP address, browser type, pages visited, time spent)</li>
          <li>Cookies and similar tracking technologies</li>
          <li>Usage data via Google Analytics 4</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Send you our newsletter (if subscribed)</li>
          <li>Respond to your contact form messages</li>
          <li>Analyze website traffic and improve our content</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Google Analytics</h2>
        <p>We use Google Analytics 4 to understand how visitors interact with our website. Google Analytics collects data such as page views, time on site, and traffic sources. This data is anonymized and aggregated. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">Google Analytics opt-out browser add-on</a>.</p>

        <h2>Cookies</h2>
        <p>We use essential cookies for website functionality and analytics cookies (Google Analytics). By continuing to use our website, you consent to the use of cookies in accordance with this policy.</p>

        <h2>Third-Party Links</h2>
        <p>Our website contains links to third-party websites, including affiliate links. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.</p>

        <h2>Email Newsletter</h2>
        <p>If you subscribe to our newsletter, your email address is stored securely. You can unsubscribe at any time by clicking the unsubscribe link in any email we send you. We will never sell or share your email address with third parties for marketing purposes.</p>

        <h2>Data Retention</h2>
        <p>We retain your personal information for as long as necessary to provide our services. Newsletter subscriber emails are retained until you unsubscribe. Contact form messages are retained for 2 years.</p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of marketing communications</li>
        </ul>
        <p>To exercise these rights, please contact us at <a href="mailto:hello@snavionza.com">hello@snavionza.com</a>.</p>

        <h2>Children&apos;s Privacy</h2>
        <p>Our website is not directed to children under 13 years of age, and we do not knowingly collect personal information from children.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@snavionza.com">hello@snavionza.com</a>.</p>
      </div>
    </div>
  );
}
