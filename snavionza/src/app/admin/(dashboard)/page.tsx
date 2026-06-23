import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types';
import StatsCard from '@/components/admin/StatsCard';
import Link from 'next/link';
import { format } from 'date-fns';
import { FileText, CheckCircle, Edit3, Users, Plus, ArrowRight, Clock } from 'lucide-react';

async function getDashboardData() {
  const supabase = await createClient();

  const [postsResult, subscribersResult, recentResult] = await Promise.all([
    supabase.from('posts').select('status', { count: 'exact' }),
    supabase.from('subscribers').select('*', { count: 'exact' }),
    supabase.from('posts')
      .select('*, category:categories(*)')
      .order('updated_at', { ascending: false })
      .limit(5),
  ]);

  const posts = postsResult.data || [];
  const totalPosts = postsResult.count || 0;
  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const draftPosts = posts.filter((p) => p.status === 'draft').length;
  const subscribers = subscribersResult.count || 0;
  const recentPosts = (recentResult.data as Post[]) || [];

  // Content update reminder: posts not updated in 180+ days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 180);
  const { data: stalePostsData } = await supabase
    .from('posts')
    .select('id, title, slug, updated_at')
    .eq('status', 'published')
    .lt('updated_at', cutoff.toISOString())
    .limit(5);

  return { totalPosts, publishedPosts, draftPosts, subscribers, recentPosts, stalePosts: stalePostsData || [] };
}

export default async function AdminDashboard() {
  const { totalPosts, publishedPosts, draftPosts, subscribers, recentPosts, stalePosts } = await getDashboardData();

  return (
    <div className="max-w-6xl">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard title="Total Articles" value={totalPosts} icon={<FileText size={20} />} color="blue" />
        <StatsCard title="Published" value={publishedPosts} icon={<CheckCircle size={20} />} color="green" />
        <StatsCard title="Drafts" value={draftPosts} icon={<Edit3 size={20} />} color="amber" />
        <StatsCard title="Subscribers" value={subscribers} icon={<Users size={20} />} color="purple" description="Newsletter subscribers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Articles</h2>
            <Link href="/admin/articles" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPosts.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500 text-sm mb-3">No articles yet.</p>
                <Link
                  href="/admin/articles/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={14} />
                  Write First Article
                </Link>
              </div>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {post.category?.name} · Updated {format(new Date(post.updated_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : post.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                    <Link
                      href={`/admin/articles/${post.id}/edit`}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions + Content Reminders */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/articles/new"
                className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                New Article
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                <FileText size={16} />
                Manage Categories
              </Link>
              <Link
                href="/admin/subscribers"
                className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Users size={16} />
                View Subscribers
              </Link>
            </div>
          </div>

          {/* Content Update Reminders */}
          {stalePosts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-amber-600" />
                <h2 className="font-semibold text-amber-900 text-sm">Update Reminders</h2>
              </div>
              <p className="text-xs text-amber-700 mb-3">
                These articles haven&apos;t been updated in 180+ days:
              </p>
              <ul className="space-y-2">
                {stalePosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/admin/articles/${post.id}/edit`}
                      className="text-xs text-amber-800 font-medium hover:underline line-clamp-1"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
