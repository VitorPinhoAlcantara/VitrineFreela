import type { APIRoute } from 'astro';

const upstream = () => process.env.UMAMI_UPSTREAM || 'http://192.168.15.3:20000';
const repassar = ['user-agent', 'content-type', 'x-forwarded-for', 'cf-connecting-ip', 'cf-ipcountry', 'accept-language'];

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const headers = new Headers();
  for (const h of repassar) {
    const v = request.headers.get(h);
    if (v) headers.set(h, v);
  }
  if (!headers.has('x-forwarded-for')) headers.set('x-forwarded-for', clientAddress);
  const r = await fetch(`${upstream()}/api/send`, { method: 'POST', headers, body: await request.text() });
  return new Response(r.body, { status: r.status, headers: { 'Content-Type': r.headers.get('content-type') ?? 'application/json' } });
};
