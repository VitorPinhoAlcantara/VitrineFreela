import type { APIRoute } from 'astro';

const upstream = () => process.env.UMAMI_UPSTREAM || 'http://192.168.15.3:20000';

export const GET: APIRoute = async () => {
  if (!process.env.UMAMI_WEBSITE_ID) return new Response(null, { status: 404 });
  const r = await fetch(`${upstream()}/script.js`);
  return new Response(r.body, {
    status: r.status,
    headers: { 'Content-Type': 'application/javascript', 'Cache-Control': 'public, max-age=3600' },
  });
};
