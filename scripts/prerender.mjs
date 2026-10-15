// Writes the rendered page into dist/index.html so the content is in the
// HTML before any JavaScript runs. Runs after `vite build` (see the build
// script in package.json): builds src/entry-server.tsx for Node into
// dist-ssr/, renders it, and replaces the empty #root. It also inlines the
// stylesheet (about 9 KB gzipped) so first paint does not wait for a second
// request.
import { build } from 'vite'
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const OUT = 'dist-ssr'

await build({
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: OUT, emptyOutDir: true },
})

const { render, head } = await import(pathToFileURL(path.resolve(OUT, 'entry-server.js')).href)
const html = await readFile('dist/index.html', 'utf8')
const empty = '<div id="root"></div>'
if (!html.includes(empty)) throw new Error(`dist/index.html has no ${empty}`)
// Function replacers: a string one would treat $& / $' in the page as patterns.
let out = html.replace(empty, () => `<div id="root">${render()}</div>`)
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
out = out
  .replace(/<title>[^<]*<\/title>/, () => `<title>${escape(head.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*" \/>/, () => `<meta name="description" content="${escape(head.description)}" />`)
const link = out.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (!link) throw new Error('dist/index.html has no stylesheet link to inline')
const css = await readFile(path.join('dist', link[1]), 'utf8')
out = out.replace(link[0], () => `<style>${css}</style>`)
await writeFile('dist/index.html', out)
await rm(OUT, { recursive: true, force: true })
console.log('prerendered dist/index.html')
