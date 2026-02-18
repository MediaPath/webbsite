import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'
import { glob } from 'glob'
import { readFileSync, statSync } from 'node:fs'

const site = process.env.SITE_URL ?? 'https://mediapatheu.wordpress.com/'

function getPageLastModDates() {
  const lastModMap = new Map()

  const blogFiles = glob.sync('src/content/blog/*.md')
  for (const file of blogFiles) {
    const content = readFileSync(file, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const updatedAtMatch = frontmatter.match(/updated_at:\s*(.+)/)
      const slugMatch = frontmatter.match(/slug:\s*(.+)/)
      if (updatedAtMatch && slugMatch) {
        const slug = slugMatch[1].trim()
        const updatedAt = updatedAtMatch[1].trim()
        lastModMap.set(`/blog/${slug}`, new Date(updatedAt))
        lastModMap.set(`/blog/${slug}/`, new Date(updatedAt))
      }
    }
  }

  const pageFiles = glob.sync('src/pages/**/*.astro')
  for (const file of pageFiles) {
    const stat = statSync(file)
    let urlPath = file.replace('src/pages', '').replace('/index.astro', '/').replace('.astro', '/')
    if (!urlPath.endsWith('/')) urlPath += '/'
    if (!lastModMap.has(urlPath)) {
      lastModMap.set(urlPath, stat.mtime)
    }
  }

  return lastModMap
}

const pageLastModDates = getPageLastModDates()

export default defineConfig({
  output: 'server',
  server: {
    open: true,
    port: 3000,
    host: '0.0.0.0',
  },
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const urlPath = new URL(item.url).pathname
        const lastmod = pageLastModDates.get(urlPath)
        if (lastmod) {
          item.lastmod = lastmod.toISOString()
        }
        return item
      },
    }),
  ],
  site,
})
