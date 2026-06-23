'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, Image as ImageIcon, Copy, Check, Trash2 } from 'lucide-react';

interface UploadedImage {
  name: string;
  url: string;
}

export default function MediaLibraryPage() {
  const supabase = createClient();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) {
        setError(`Upload failed: ${error.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        setImages((prev) => [...prev, { name: file.name, url: urlData.publicUrl }]);
      }
    }

    setUploading(false);
    e.target.value = '';
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const removeFromList = (url: string) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Media Library</h2>
          <p className="text-sm text-gray-500 mt-1">Upload images to Supabase Storage</p>
        </div>
      </div>

      {/* Upload area */}
      <div className="mb-6">
        <label
          htmlFor="media-upload"
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
            uploading
              ? 'border-blue-300 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm font-medium text-blue-700">Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={28} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Click to upload images</span>
                <span className="text-xs text-gray-400">PNG, JPG, WebP, GIF up to 10MB</span>
              </>
            )}
          </div>
          <input
            id="media-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Setup note */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Setup Required:</strong> Create a Storage bucket named <code className="bg-amber-100 px-1 rounded">article-images</code> in your Supabase project and set it to <strong>Public</strong>. Then uploads will work automatically.
      </div>

      {/* Uploaded images */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.url} className="group relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(img.url)}
                  className="p-2 bg-white rounded-lg text-gray-700 hover:text-blue-600"
                  title="Copy URL"
                >
                  {copiedUrl === img.url ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <button
                  onClick={() => removeFromList(img.url)}
                  className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-600"
                  title="Remove from list"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="px-2 py-1.5 text-xs text-gray-500 truncate">{img.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-gray-200 rounded-2xl">
          <ImageIcon size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No images uploaded this session.</p>
          <p className="text-gray-400 text-xs mt-1">Upload images above to use them in your articles.</p>
        </div>
      )}
    </div>
  );
}
