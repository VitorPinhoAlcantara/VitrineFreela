import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { host: true, port: 4321 },
  security: {
    allowedDomains: [
      { hostname: '192.168.15.3', protocol: 'http', port: '20009' },
      { hostname: 'vitrine.alcantara.dev.br', protocol: 'https' },
    ],
  },
  devToolbar: { enabled: false },
});
