'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

interface NewsletterFormProps {
  placeholder?: string;
  buttonText?: string;
  source?: string;
}

async function subscribeEmail(email: string, source: string) {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Subscription failed');
  }
  return res.json();
}

export function NewsletterForm({ placeholder = 'Enter your email', buttonText = 'Subscribe', source = 'website' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await subscribeEmail(email, source);
      setStatus('success');
      setMessage('🎉 You\'re subscribed! Check your inbox for a confirmation.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="text-green-700 font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Email address"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shrink-0"
      >
        {status === 'loading' ? 'Subscribing...' : buttonText}
        {status !== 'loading' && <ArrowRight size={16} />}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-xs mt-1 col-span-full">{message}</p>
      )}
    </form>
  );
}
