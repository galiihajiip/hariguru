import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * WhatsApp/Facebook only render link previews when og:image is an absolute URL.
 * Vercel exposes the production domain at build time, so we fill it in automatically.
 * (Optional: set SITE_URL to override. Without either, relative paths are kept.)
 */
function absoluteOgUrls(): Plugin {
  const raw = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
  const site = raw ? (raw.startsWith('http') ? raw : `https://${raw}`).replace(/\/$/, '') : ''
  return {
    name: 'absolute-og-urls',
    transformIndexHtml(html) {
      if (!site) return html
      return html
        .replaceAll('content="/og-image.jpg"', `content="${site}/og-image.jpg"`)
        .replace('<meta property="og:type"', `<meta property="og:url" content="${site}/" />\n    <meta property="og:type"`)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), absoluteOgUrls()],
  build: { outDir: 'dist', sourcemap: false },
})
