// Writes the rendered page into dist/index.html so the content is in the
// HTML before any JavaScript runs. Runs after `vite build` (see the build
// script in package.json): builds src/entry-server.tsx for Node into
// dist-ssr/, renders it, and replaces the empty #root.
import { build } from 'vite'
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const OUT = 'dist-ssr'

await build({
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: OUT, emptyOutDir: true },
})

const { render } = await import(pathToFileURL(path.resolve(OUT, 'entry-server.js')).href)
const html = await readFile('dist/index.html', 'utf8')
const empty = '<div id="root"></div>'
if (!html.includes(empty)) throw new Error(`dist/index.html has no ${empty}`)
// Function replacer: a string one would treat $& / $' in the page as patterns.
await writeFile('dist/index.html', html.replace(empty, () => `<div id="root">${render()}</div>`))
await rm(OUT, { recursive: true, force: true })
console.log('prerendered dist/index.html')
