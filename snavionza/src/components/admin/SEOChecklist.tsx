'use client';

import { CheckCircle, XCircle } from 'lucide-react';

interface SEOChecklistProps {
  hasMetaDescription: boolean;
  hasFeaturedImage: boolean;
  hasContent: boolean;
  contentLength: number;
  hasSlug: boolean;
  hasExcerpt: boolean;
}

interface CheckItem {
  label: string;
  passed: boolean;
  tip: string;
}

export default function SEOChecklist({
  hasMetaDescription,
  hasFeaturedImage,
  hasContent,
  contentLength,
  hasSlug,
  hasExcerpt,
}: SEOChecklistProps) {
  const checks: CheckItem[] = [
    {
      label: 'Article has a URL slug',
      passed: hasSlug,
      tip: 'A slug is required for the article URL.',
    },
    {
      label: 'Meta description added',
      passed: hasMetaDescription,
      tip: 'Add a 120–160 character meta description for SEO.',
    },
    {
      label: 'Featured image set',
      passed: hasFeaturedImage,
      tip: 'Featured images increase click-through rates from search.',
    },
    {
      label: 'Excerpt / summary written',
      passed: hasExcerpt,
      tip: 'Write a short excerpt that summarizes the article.',
    },
    {
      label: 'Content written (500+ words)',
      passed: hasContent && contentLength >= 500,
      tip: `Current: ~${contentLength} words. Aim for 1,000+ for best SEO results.`,
    },
  ];

  const passed = checks.filter((c) => c.passed).length;
  const total = checks.length;
  const score = Math.round((passed / total) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">SEO Checklist</h3>
        <span className={`text-sm font-bold ${score === 100 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
          {passed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${score === 100 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <ul className="space-y-2.5">
        {checks.map((check) => (
          <li key={check.label} className="flex items-start gap-2.5">
            {check.passed ? (
              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-xs font-medium ${check.passed ? 'text-gray-700' : 'text-gray-600'}`}>
                {check.label}
              </p>
              {!check.passed && (
                <p className="text-xs text-gray-400 mt-0.5">{check.tip}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
