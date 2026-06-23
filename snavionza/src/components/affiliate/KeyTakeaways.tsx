import { Lightbulb } from 'lucide-react';

interface KeyTakeawaysProps {
  items: string[];
  title?: string;
}

export default function KeyTakeaways({ items, title = 'Key Takeaways' }: KeyTakeawaysProps) {
  return (
    <div className="my-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
      <h4 className="flex items-center gap-2 text-base font-bold text-amber-900 mb-4">
        <Lightbulb size={20} className="text-amber-500" />
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-800">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-white text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
