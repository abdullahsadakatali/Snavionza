'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Category } from '@/lib/types';
import { generateSlug } from '@/lib/utils/slug';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function CategoriesPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories((data as Category[]) || []);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    setError('');
    const { error } = await supabase.from('categories').insert({
      name: newName.trim(),
      slug: newSlug.trim() || generateSlug(newName),
      description: newDesc.trim() || null,
    });
    if (error) { setError(error.message); } else {
      setNewName(''); setNewSlug(''); setNewDesc('');
      fetchCategories();
    }
    setLoading(false);
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from('categories').update({
      name: editName.trim(),
      slug: editSlug.trim(),
      description: editDesc.trim() || null,
    }).eq('id', id);
    if (!error) { setEditId(null); fetchCategories(); }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Articles in this category will be uncategorized.`)) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  };

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditDesc(cat.description || '');
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Categories</h2>

      {/* Create form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus size={16} className="text-blue-600" />
          Add New Category
        </h3>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setNewSlug(generateSlug(e.target.value));
                }}
                placeholder="AI Writing"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="ai-writing"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Description (optional)</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Short category description..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !newName.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            <Plus size={15} />
            Create Category
          </button>
        </form>
      </div>

      {/* Category list */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-semibold text-gray-700">{categories.length} categories</p>
        </div>
        {categories.length === 0 ? (
          <p className="text-center py-10 text-gray-500 text-sm">No categories yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <li key={cat.id} className="px-5 py-4">
                {editId === cat.id ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input value={editName} onChange={(e) => setEditName(e.target.value)} className="px-3 py-2 text-sm border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className="px-3 py-2 text-sm border border-blue-300 rounded-xl focus:outline-none font-mono" />
                    </div>
                    <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Description..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none" />
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(cat.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">
                        <Save size={13} /> Save
                      </button>
                      <button onClick={() => setEditId(null)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200">
                        <X size={13} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <p className="text-xs text-gray-400 font-mono">/{cat.slug}</p>
                      {cat.description && <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(cat)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={15} />
                      </button>
                      <button onClick={() => handleDelete(cat.id, cat.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
