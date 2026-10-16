// Builds public/images from design/reference (gitignored source material).
// Run: node scripts/images.mjs
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const REF = 'design/reference'
const MDH = `${REF}/M-DESIGN HOUSE`
const OUT = 'public/images'

// Only images the site uses and whose source is in design/reference. Most
// photos (project galleries, hero poster, Skrzypiec stage photos, the
// mdh-logo-* PNGs) came finished from the designer's v52 and are committed
// as-is; skrzypiec-kuchnia in particular must not be regenerated.
// name -> [source, maxWidth]
const images = {
  // Stalis floor plan; the designer's v52 gallery pointed this slot at a render.
  'projects/dom-stalis-180-plan': [`${MDH}/WITEK_STALIS/Без имени-1.png`, 1600],
}

await mkdir(OUT, { recursive: true })

for (const [name, [src, width]] of Object.entries(images)) {
  const base = sharp(src).rotate().resize({ width, withoutEnlargement: true })
  await base.clone().webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`))
  console.log('ok', name)
}

// Favicon: knock out the logo's white background and crop the "M" mark.
const logoSrc = `${MDH}/M DESIGN HOUSE_LOGO.png`
const { data, info } = await sharp(logoSrc).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
for (let i = 0; i < data.length; i += 4) {
  const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
  // white -> transparent, dark -> opaque; keep gold as-is
  const isGold = data[i] > 150 && data[i + 2] < 140 && data[i] - data[i + 2] > 40
  data[i + 3] = isGold ? 255 : Math.max(0, Math.min(255, Math.round((255 - lum) * 1.15)))
}
const logoPng = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer()
// The mark occupies roughly the top 45% of the square
const markPng = await sharp(logoPng).extract({ left: 0, top: 0, width: info.width, height: Math.round(info.height * 0.52) }).png().toBuffer()
const mark = await sharp(markPng).trim().png().toBuffer()
// Browsers draw a favicon into a square, so a wide file gets squeezed (the
// old 400x251 one made the "M" look narrow in tabs). Pad the mark onto a
// transparent square instead; 512 px also meets Google's square, multiple-of-
// 48 rule for search-result icons.
const square = async (size, markWidth, background) =>
  sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: await sharp(mark).resize({ width: markWidth }).png().toBuffer(), gravity: 'center' }])
    .png()
await (await square(512, 496, { r: 0, g: 0, b: 0, alpha: 0 })).toFile(path.join(OUT, 'favicon-512.png'))
// Home-screen icon: iOS fills transparency with black, so use the plaster
// background, with room around the mark for the rounded mask.
await (await square(180, 136, '#f6f3ee')).flatten({ background: '#f6f3ee' }).toFile(path.join(OUT, 'apple-touch-icon.png'))
console.log('ok favicon-512, apple-touch-icon')

// Social preview: 1200x630 JPG (WebP is not shown by every link unfurler).
await sharp(path.join(OUT, 'hero-pergola-poster.webp'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(OUT, 'og-image.jpg'))
console.log('ok og-image')
