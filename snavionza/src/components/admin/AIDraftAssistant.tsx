'use client';

import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface AIDraftAssistantProps {
  onApplyOutline?: (outline: string) => void;
  onApplyMeta?: (meta: { title: string; description: string }) => void;
}

function generateOutline(topic: string): string {
  const templates: Record<string, string[]> = {
    review: [
      `# [Tool Name] Review: Is It Worth It in [Year]?`,
      `\n## What Is [Tool Name]?`,
      `\n## Key Features`,
      `\n## Pros and Cons`,
      `\n## Pricing`,
      `\n## Who Should Use [Tool Name]?`,
      `\n## [Tool Name] vs Alternatives`,
      `\n## Final Verdict`,
    ],
    comparison: [
      `# [Tool A] vs [Tool B]: Which Is Better for [Use Case]?`,
      `\n## Quick Comparison`,
      `\n## [Tool A] Overview`,
      `\n## [Tool B] Overview`,
      `\n## Feature Comparison`,
      `\n## Pricing Comparison`,
      `\n## Which Should You Choose?`,
    ],
    guide: [
      `# How to [Accomplish Goal] with AI in [Year]`,
      `\n## Why This Matters`,
      `\n## What You'll Need`,
      `\n## Step 1: [First Step]`,
      `\n## Step 2: [Second Step]`,
      `\n## Step 3: [Third Step]`,
      `\n## Common Mistakes to Avoid`,
      `\n## Key Takeaways`,
    ],
    listicle: [
      `# [Number] Best [Category] Tools for [Use Case] in [Year]`,
      `\n## How We Chose These Tools`,
      `\n## 1. [Tool Name]`,
      `\n## 2. [Tool Name]`,
      `\n## 3. [Tool Name]`,
      `\n## How to Choose the Right Tool`,
      `\n## Final Thoughts`,
    ],
  };

  const type = topic.toLowerCase().includes('vs') ? 'comparison'
    : topic.toLowerCase().includes('review') ? 'review'
    : topic.toLowerCase().includes('best') || topic.toLowerCase().includes('top') ? 'listicle'
    : 'guide';

  return (templates[type] || templates.guide).join('');
}

export default function AIDraftAssistant({ onApplyOutline, onApplyMeta }: AIDraftAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('AI Tool Reviews');
  const [generated, setGenerated] = useState<{ outline: string; metaTitle: string; metaDesc: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!topic.trim()) return;
    const outline = generateOutline(topic);
    const metaTitle = `${topic} | Snavionza`;
    const metaDesc = `Discover everything you need to know about ${topic.toLowerCase()}. Expert analysis, honest reviews, and practical recommendations for creators and professionals.`;
    setGenerated({ outline, metaTitle, metaDesc });
  };

  const copyOutline = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated.outline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">AI Draft Assistant</p>
          <p className="text-xs text-gray-600">Generate outlines, headings, and SEO metadata</p>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-blue-200 pt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Article Topic / Title</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Best AI Writing Tools for Bloggers 2025"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {['AI Writing', 'AI Productivity', 'AI Marketing', 'AI Automation',
                'AI Tool Reviews', 'AI Comparisons', 'AI Workflows', 'Creator Tools',
                'Business Productivity', 'Student Productivity'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={generate}
            disabled={!topic.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Sparkles size={15} />
            Generate Draft Outline
          </button>

          {generated && (
            <div className="space-y-3">
              {/* Outline */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-700">Suggested Outline</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={copyOutline} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    {onApplyOutline && (
                      <button type="button" onClick={() => onApplyOutline(generated.outline)} className="text-xs text-blue-600 font-semibold hover:underline">
                        Apply to Editor
                      </button>
                    )}
                  </div>
                </div>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">{generated.outline}</pre>
              </div>

              {/* SEO */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-700 mb-2">Suggested SEO Metadata</p>
                <div>
                  <p className="text-xs text-gray-500">Meta Title:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-800 flex-1">{generated.metaTitle}</p>
                    {onApplyMeta && (
                      <button type="button" onClick={() => onApplyMeta({ title: generated.metaTitle, description: generated.metaDesc })} className="text-xs text-blue-600 font-semibold hover:underline shrink-0">
                        Apply
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mt-2">Meta Description:</p>
                  <p className="text-xs text-gray-800 mt-1">{generated.metaDesc}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
