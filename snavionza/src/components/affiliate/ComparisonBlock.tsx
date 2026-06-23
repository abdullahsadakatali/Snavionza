import { ExternalLink } from 'lucide-react';

interface ToolInfo {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  rating?: number;
  ctaUrl: string;
  ctaText?: string;
  badge?: string;
}

interface ComparisonBlockProps {
  toolA: ToolInfo;
  toolB: ToolInfo;
  verdict?: string;
}

export default function ComparisonBlock({ toolA, toolB, verdict }: ComparisonBlockProps) {
  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl border border-gray-200 overflow-hidden">
        {[toolA, toolB].map((tool, i) => (
          <div
            key={i}
            className={`p-6 ${i === 0 ? 'bg-white border-b md:border-b-0 md:border-r border-gray-200' : 'bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-gray-900">{tool.name}</h4>
              {tool.badge && (
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {tool.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{tool.description}</p>

            <div className="mb-4">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Pros</p>
              <ul className="space-y-1.5">
                {tool.pros.map((pro, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Cons</p>
              <ul className="space-y-1.5">
                {tool.cons.map((con, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={tool.ctaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {tool.ctaText || `Try ${tool.name}`}
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {verdict && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm font-semibold text-blue-800">
            <span className="font-bold">Our Verdict: </span>
            {verdict}
          </p>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2 text-center">
        *Contains affiliate links — we may earn a commission.
      </p>
    </div>
  );
}
