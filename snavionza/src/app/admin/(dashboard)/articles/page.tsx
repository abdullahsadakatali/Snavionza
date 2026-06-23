import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

async function getPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('updated_at', { ascending: false });
  return (data as Post[]) || [];
}

export default async function AdminArticlesPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All Articles</h2>
          <p className="text-sm text-gray-500 mt-1">{posts.length} articles total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No articles yet.</p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700"
            >
              <Plus size={14} />
              Write Your First Article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-700">Title</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 hidden md:table-cell">Status</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 hidden lg:table-cell">Updated</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900 line-clamp-1 max-w-xs">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-gray-600 text-xs">{post.category?.name || '—'}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : post.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">
                      {format(new Date(post.updated_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'published' && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                            title="View article"
                          >
                            <Eye size={16} />
                          </a>
                        )}
                        <Link
                          href={`/admin/articles/${post.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                          title="Edit article"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteButton postId={post.id} postTitle={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Client delete button
function DeleteButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  return (
    <form
      action={async () => {
        'use server';
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        await supabase.from('posts').delete().eq('id', postId);
      }}
    >
      <button
        type="submit"
        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
        title="Delete article"
        onClick={(e) => {
          if (!confirm(`Delete "${postTitle}"? This cannot be undone.`)) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
