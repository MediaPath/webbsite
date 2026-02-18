import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'
import { glob } from 'glob'
import { readFileSync, statSync } from 'node:fs'

const site = process.env.SITE_URL ?? 'https://mediapath.eu/'
const ensurePathTrailingSlash = (path) =>
  /\.[a-zA-Z0-9]+$/.test(path) || path.endsWith('/') ? path : `${path}/`

function getPageLastModDates() {
  const lastModMap = new Map()

  const setCollectionLastModDates = (collectionName) => {
    const files = glob.sync(`src/content/${collectionName}/*.md`)

    for (const file of files) {
      const content = readFileSync(file, 'utf-8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      const frontmatter = frontmatterMatch?.[1] ?? ''
      const updatedAtMatch = frontmatter.match(/^updated_at:\s*(.+)$/m)
      const pubDateMatch = frontmatter.match(/^pubDate:\s*(.+)$/m)
      const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m)
      const slug =
        slugMatch?.[1]?.trim() ??
        file
          .replace(`src/content/${collectionName}/`, '')
          .replace(/\.md$/, '')

      const fallbackDate = statSync(file).mtime
      let lastModifiedDate = fallbackDate

      if (updatedAtMatch) {
        const parsed = new Date(updatedAtMatch[1].trim())
        if (!Number.isNaN(parsed.getTime())) {
          lastModifiedDate = parsed
        }
      } else if (pubDateMatch) {
        const parsed = new Date(pubDateMatch[1].trim())
        if (!Number.isNaN(parsed.getTime())) {
          lastModifiedDate = parsed
        }
      }

      const routePath = `/${collectionName}/${slug}`
      lastModMap.set(routePath, lastModifiedDate)
      lastModMap.set(`${routePath}/`, lastModifiedDate)
    }
  }

  setCollectionLastModDates('blog')
  setCollectionLastModDates('article')

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
      serialize(item) {
        const urlPath = ensurePathTrailingSlash(new URL(item.url).pathname)
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
