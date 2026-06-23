import { createClient } from '@/lib/supabase/server';
import { Subscriber } from '@/lib/types';
import { format } from 'date-fns';
import { Users, Mail } from 'lucide-react';

async function getSubscribers() {
  const supabase = await createClient();
  const { data, count } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });
  return { subscribers: (data as Subscriber[]) || [], count: count || 0 };
}

export default async function SubscribersPage() {
  const { subscribers, count } = await getSubscribers();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Newsletter Subscribers</h2>
          <p className="text-sm text-gray-500 mt-1">{count} total subscribers</p>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-2xl">
          <Users size={22} className="text-purple-600" />
        </div>
      </div>

      {/* MailerLite note */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <strong>MailerLite Integration:</strong> When you add your MailerLite API key to <code className="bg-blue-100 px-1 rounded">.env.local</code>, new subscribers will automatically sync to your MailerLite audience. Subscribers are also stored here in Supabase.
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="text-center py-16">
            <Mail size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No subscribers yet.</p>
            <p className="text-sm text-gray-400 mt-1">Share your newsletter page to start growing!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-700">#</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Email</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((sub, index) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-3">
                      <a
                        href={`mailto:${sub.email}`}
                        className="text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {sub.email}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {format(new Date(sub.created_at), 'MMMM d, yyyy')}
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
