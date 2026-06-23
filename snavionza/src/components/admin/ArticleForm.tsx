'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Category, Post } from '@/lib/types';
import { generateSlug } from '@/lib/utils/slug';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { createClient } from '@/lib/supabase/client';
import SEOChecklist from '@/components/admin/SEOChecklist';
import AIDraftAssistant from '@/components/admin/AIDraftAssistant';
import { Globe, FileText, Eye, EyeOff, Image as ImageIcon, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

const Editor = dynamic(() => import('@/components/admin/Editor'), { ssr: false });

interface ArticleFormProps {
  categories: Category[];
  initialData?: Partial<Post>;
  mode: 'create' | 'edit';
}

export default function ArticleForm({ categories, initialData, mode }: ArticleFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>(initialData?.status || 'draft');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [scheduledAt, setScheduledAt] = useState(initialData?.scheduled_at || '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showSEO, setShowSEO] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);



  // Word count for SEO checklist
  const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;

  const handleSave = async (saveStatus: 'draft' | 'published' | 'scheduled' = status) => {
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!slug.trim()) { setError('Slug is required.'); return; }
    setError('');
    setSaving(true);

    const readingTime = calculateReadingTime(content);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      featured_image: featuredImage.trim() || null,
      category_id: categoryId || null,
      status: saveStatus,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      reading_time: readingTime,
      published_at: saveStatus === 'published' ? new Date().toISOString() : (initialData?.published_at || null),
      scheduled_at: saveStatus === 'scheduled' && scheduledAt ? scheduledAt : null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (mode === 'edit' && initialData?.id) {
      result = await supabase.from('posts').update(payload).eq('id', initialData.id);
    } else {
      result = await supabase.from('posts').insert(payload).select().single();
    }

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setLastSaved(new Date());
    setStatus(saveStatus);
    if (mode === 'create' && result.data) {
      router.push(`/admin/articles/${result.data.id}/edit`);
    }
  };

  const handleApplyOutline = useCallback((outline: string) => {
    setContent((prev) => prev + `\n${outline}`);
  }, []);

  const handleApplyMeta = useCallback(({ title: t, description: d }: { title: string; description: string }) => {
    setMetaTitle(t);
    setMetaDescription(d);
  }, []);

  return (
    <div className="max-w-6xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
            status === 'published' ? 'bg-green-100 text-green-700'
            : status === 'scheduled' ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'
          }`}>
            {status}
          </span>
          {lastSaved && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={11} />
              Saved {format(lastSaved, 'h:mm a')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-60"
          >
            <FileText size={15} />
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            <Globe size={15} />
            {saving ? 'Saving...' : status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Main editor area */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugManuallyEdited) {
                  setSlug(generateSlug(e.target.value));
                }
              }}
              placeholder="Article title..."
              className="w-full px-0 py-3 text-3xl font-bold text-gray-900 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>

          {/* Slug */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 shrink-0">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
              placeholder="url-slug"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            />
          </div>

          {/* AI Draft Assistant */}
          <AIDraftAssistant
            onApplyOutline={handleApplyOutline}
            onApplyMeta={handleApplyMeta}
          />

          {/* Editor */}
          <Editor
            content={content}
            onChange={setContent}
            placeholder="Start writing your article..."
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm">Publishing</h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar size={12} />
                Schedule Publication
              </label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {scheduledAt && (
                <button
                  type="button"
                  onClick={() => handleSave('scheduled')}
                  disabled={saving}
                  className="w-full mt-2 px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Schedule Post
                </button>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <ImageIcon size={15} />
              Featured Image
            </h3>
            <input
              type="url"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featuredImage}
                alt="Preview"
                className="w-full aspect-video object-cover rounded-xl"
              />
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Excerpt</h3>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Short description of the article..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* SEO */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSEO(!showSEO)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>SEO Settings</span>
              {showSEO ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
            {showSEO && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={`${title} | Snavionza`}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">{metaTitle.length}/60 chars</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    placeholder="160-character SEO description..."
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <p className={`text-xs mt-1 ${metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                    {metaDescription.length}/160 chars
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SEO Checklist */}
          <SEOChecklist
            hasMetaDescription={metaDescription.length > 0}
            hasFeaturedImage={featuredImage.length > 0}
            hasContent={wordCount > 0}
            contentLength={wordCount}
            hasSlug={slug.length > 0}
            hasExcerpt={excerpt.length > 0}
          />
        </div>
      </div>
    </div>
  );
}
