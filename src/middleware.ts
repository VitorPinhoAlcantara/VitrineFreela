import { defineMiddleware } from 'astro:middleware';

const seguranca = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const r = await next();
  for (const [k, v] of Object.entries(seguranca)) r.headers.set(k, v);
  return r;
});
