import { NextRequest, NextResponse } from 'next/server';

interface EnquiryPayload {
  name: string;
  phone: string;
  city: string;
  eventType: string;
  budgetRange: string;
  brief: string;
  website?: string; // honeypot
}

export async function POST(req: NextRequest) {
  let body: EnquiryPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, phone, city, eventType, budgetRange, brief, website } = body;

  // Honeypot: bots fill this field, humans don't
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Only name and phone are required — everything else improves the lead but isn't blocking
  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Compose WhatsApp alert message
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const message = [
    '🚨 New Lead — AAA Events',
    '',
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `City: ${city.trim()}`,
    `Event: ${eventType}`,
    `Budget: ${budgetRange}`,
    `Brief: ${brief.trim()}`,
    '',
    `Time: ${timestamp} IST`,
  ].join('\n');

  // Dispatch to both directors in parallel; don't let failures block the response
  const d1Phone = process.env.DIRECTOR_1_PHONE;
  const d1Key   = process.env.DIRECTOR_1_WA_APIKEY;
  const d2Phone = process.env.DIRECTOR_2_PHONE;
  const d2Key   = process.env.DIRECTOR_2_WA_APIKEY;

  const sends: Promise<void>[] = [];
  if (d1Phone && d1Key) sends.push(sendCallMeBot(d1Phone, d1Key, message));
  if (d2Phone && d2Key) sends.push(sendCallMeBot(d2Phone, d2Key, message));

  const results = await Promise.allSettled(sends);
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`[enquiry] WA dispatch failed for director ${i + 1}:`, r.reason);
    }
  });

  return NextResponse.json({ ok: true });
}

async function sendCallMeBot(phone: string, apikey: string, text: string): Promise<void> {
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apikey)}`;

  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`CallMeBot returned ${res.status} for phone ${phone}`);
  }
}
