import { readFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// O dev não serve o index.html de subpastas de public/, e a lista de arquivos do Vite perde entradas
// quando um modelo é apagado e recriado com o servidor no ar. Por isso lê direto do disco.
const tipos = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript', webp: 'image/webp' };
const raiz = new URL('./public/modelos/', import.meta.url).href;
const modelosNoDev = {
  name: 'modelos-no-dev',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const caminho = req.url.split('?')[0];
      if (!caminho.startsWith('/modelos/')) return next();
      const arquivo = new URL(`./public${caminho}${caminho.endsWith('/') ? 'index.html' : ''}`, import.meta.url);
      const tipo = tipos[arquivo.pathname.split('.').pop()];
      if (!tipo || !arquivo.href.startsWith(raiz)) return next();
      try {
        const corpo = await readFile(arquivo);
        res.setHeader('Content-Type', tipo);
        res.setHeader('Cache-Control', 'no-cache');
        res.end(corpo);
      } catch {
        next();
      }
    });
  },
};

export default defineConfig({
  site: 'https://vitrine.alcantara.dev.br',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { host: true, port: 4321 },
  security: {
    allowedDomains: [
      { hostname: '192.168.15.3', protocol: 'http', port: '20009' },
      { hostname: 'vitrine.alcantara.dev.br', protocol: 'https' },
    ],
  },
  vite: { plugins: [modelosNoDev] },
  devToolbar: { enabled: false },
});
