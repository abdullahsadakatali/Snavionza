import Link from 'next/link';
import { Info } from 'lucide-react';

export default function AffiliateDisclosure() {
  return (
    <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
      <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
      <p className="text-xs text-gray-500 leading-relaxed">
        <span className="font-semibold text-gray-700">Affiliate Disclosure: </span>
        Some links in this article are affiliate links. If you click and purchase, we may earn a small commission at no additional cost to you. We only recommend tools we genuinely believe in.{' '}
        <Link href="/affiliate-disclosure" className="underline hover:text-blue-600">
          Read our full disclosure policy.
        </Link>
      </p>
    </div>
  );
}
