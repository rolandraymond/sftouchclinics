import { validateBooking } from '../../src/lib/booking';
interface Env { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string; GOOGLE_REFRESH_TOKEN: string; GOOGLE_SHEET_ID: string; GOOGLE_SHEET_TAB?: string; }
const reply = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export async function onRequest({ request, env }: { request: Request; env: Env }): Promise<Response> {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply({ ok: false }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply({ ok: false }, 415);
  // Bound the streamed body as Content-Length is not trustworthy.
  const reader = request.body?.getReader();
  if (!reader) return reply({ ok: false }, 400);
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); return reply({ ok: false }, 413); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  let input: unknown;
  try { input = JSON.parse(new TextDecoder().decode(bytes)); } catch { return reply({ ok: false }, 400); }
  const { data: d, errors } = validateBooking(input);
  if (Object.keys(errors).length) return reply({ ok: false, errors }, 422);
  if (![env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.GOOGLE_REFRESH_TOKEN, env.GOOGLE_SHEET_ID].every(Boolean)) return reply({ ok: false }, 503);
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', body: new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET, refresh_token: env.GOOGLE_REFRESH_TOKEN, grant_type: 'refresh_token' }), signal: AbortSignal.timeout(7000),
    });
    const token = await tokenResponse.json() as { access_token?: string };
    if (!tokenResponse.ok || !token.access_token) throw new Error('token');
    const tab = (env.GOOGLE_SHEET_TAB || 'Bookings').replace(/'/g, "''");
    const range = encodeURIComponent(`'${tab}'!A:H`);
    const sheetResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEET_ID)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
      method: 'POST', headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ majorDimension: 'ROWS', values: [[new Date().toISOString(), d.name, d.phone, d.service, d.branch, d.date, d.time, d.notes]] }), signal: AbortSignal.timeout(10000),
    });
    if (!sheetResponse.ok) throw new Error('sheet');
    return reply({ ok: true });
  } catch {
    // Never log patient data, tokens, Google response bodies or secrets.
    console.error('Booking sheet write could not be confirmed');
    return reply({ ok: false }, 502);
  }
}