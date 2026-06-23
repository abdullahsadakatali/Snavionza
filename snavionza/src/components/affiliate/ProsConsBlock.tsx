interface ProsConsBlockProps {
  pros: string[];
  cons: string[];
  title?: string;
}

export default function ProsConsBlock({ pros, cons, title }: ProsConsBlockProps) {
  return (
    <div className="my-8">
      {title && <h4 className="text-lg font-bold text-gray-900 mb-4">{title}</h4>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h5 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>✓</span> Pros
          </h5>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 shrink-0 mt-0.5">•</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h5 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>✗</span> Cons
          </h5>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-400 shrink-0 mt-0.5">•</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
