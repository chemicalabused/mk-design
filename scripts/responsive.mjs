// Builds smaller widths of the gallery images for srcset.
// Reads the committed WebPs in public/images, writes variants to
// public/images/sizes/<same path>-<width>.webp and records which widths exist
// in src/content/image-widths.json (the original's own width included), which
// Picture uses to build srcset. Run after adding or swapping images:
//   node scripts/responsive.mjs
import sharp from 'sharp'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const PUBLIC = 'public'
const WIDTHS = [480, 800, 1200]
// Base paths (no extension) relative to public/. projects/ is taken whole.
const EXTRA = [
  'images/hero-pergola-poster',
  'images/skrzypiec-kuchnia',
  'images/skrzypiec-etap-instalacji',
  'images/skrzypiec-kuchnia-montaz',
]

const projects = (await readdir(path.join(PUBLIC, 'images/projects')))
  .filter((f) => f.endsWith('.webp'))
  .map((f) => `images/projects/${f.slice(0, -'.webp'.length)}`)

const manifest = {}
for (const base of [...EXTRA, ...projects].sort()) {
  const src = path.join(PUBLIC, `${base}.webp`)
  const { width } = await sharp(src).metadata()
  const widths = WIDTHS.filter((w) => w < width * 0.9)
  const outDir = path.join(PUBLIC, 'images/sizes', path.dirname(base.slice('images/'.length)))
  await mkdir(outDir, { recursive: true })
  for (const w of widths) {
    await sharp(src)
      .resize({ width: w })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, `${path.basename(base)}-${w}.webp`))
  }
  manifest[`/${base}`] = [...widths, width]
}

await writeFile('src/content/image-widths.json', `${JSON.stringify(manifest, null, 2)}\n`)
console.log('ok', Object.keys(manifest).length, 'images')
