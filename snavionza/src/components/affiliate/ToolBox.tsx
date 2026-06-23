import { ExternalLink, Star } from 'lucide-react';

interface ToolBoxProps {
  name: string;
  description: string;
  ctaText?: string;
  ctaUrl: string;
  rating?: number;
  badge?: string;
}

export default function ToolBox({
  name,
  description,
  ctaText = 'Try It Free',
  ctaUrl,
  rating,
  badge,
}: ToolBoxProps) {
  return (
    <div className="my-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
        <div>
          {badge && (
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              {badge}
            </span>
          )}
          <h4 className="text-xl font-bold text-gray-900">{name}</h4>
        </div>
        {rating && (
          <div className="flex items-center gap-1 text-amber-500 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(rating) ? 'currentColor' : 'none'}
              />
            ))}
            <span className="text-sm font-medium text-gray-600 ml-1">{rating}/5</span>
          </div>
        )}
      </div>

      <p className="text-gray-700 leading-relaxed mb-5">{description}</p>

      <a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
      >
        {ctaText}
        <ExternalLink size={16} />
      </a>

      <p className="text-xs text-gray-500 mt-3">
        *Affiliate link — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
