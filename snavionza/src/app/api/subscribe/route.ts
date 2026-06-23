import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function addToMailerLite(email: string): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return; // Skip if not configured

  try {
    const body: Record<string, unknown> = { email };

    // If a group ID is specified, add subscriber to that group
    const groupId = process.env.MAILERLITE_GROUP_ID;
    if (groupId) {
      // Add to specific group
      const res = await fetch(`https://connect.mailerlite.com/api/groups/${groupId}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('MailerLite group error:', err);
      }
    } else {
      // Add subscriber to the account without a specific group
      const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('MailerLite subscriber error:', err);
      }
    }
  } catch (err) {
    // Don't fail the whole request if MailerLite is down
    console.error('MailerLite API call failed:', err);
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const supabase = await createClient();

    // Save to Supabase (upsert avoids duplicate errors)
    const { error } = await supabase
      .from('subscribers')
      .upsert({ email: cleanEmail }, { onConflict: 'email' });

    if (error) {
      console.error('Supabase subscription error:', error);
      return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
    }

    // Sync to MailerLite (non-blocking — failure here won't affect user)
    await addToMailerLite(cleanEmail);

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('Subscribe API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
