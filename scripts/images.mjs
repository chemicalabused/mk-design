// Builds public/images from design/reference (gitignored source material).
// Run: node scripts/images.mjs
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const REF = 'design/reference'
const MDH = `${REF}/M-DESIGN HOUSE`
const OUT = 'public/images'

// name -> [source, maxWidth]
const images = {
  'hero-stalis': [`${MDH}/WITEK_STALIS/4a246048-d001-480d-958e-b2f9456778de.png`, 2000],
  'stalis-salon': [`${MDH}/WITEK_STALIS/a786b391-aec6-4fa0-af62-bdedb43d2331.png`, 1600],
  'glucholazy-ulica': [`${MDH}/GLUCHOLAZY/5.png`, 1600],
  'glucholazy-wnetrze': [`${MDH}/GLUCHOLAZY/1.png`, 1600],
  'altea-salon': [`${MDH}/ALTEA/Wizualizacja_Salon.png`, 1600],
  'altea-sypialnia': [`${MDH}/ALTEA/Wizualizacja_S.png`, 1600],
  'prudnik-dom': [`${MDH}/KAMIL/file_00000000be3c71f8935245ce14234e9f.png`, 1600],
  'prudnik-salon': [`${MDH}/KAMIL/Новая папка/Wizual.png`, 1600],
  'loft-elewacja': [`${MDH}/LOFT/d9472215-7138-4f43-9cc1-c0d284042921.png`, 1600],
  'loft-wnetrze': [`${MDH}/LOFT/05b9b92b-fb41-4d5d-804b-bf2e3dd648a4.png`, 1600],
  'witolda-salon': [`${MDH}/WROCLAW_WITOLDA/Wroclaw/1783934836950.png`, 1600],
  'witolda-sypialnia': [`${MDH}/WROCLAW_WITOLDA/Wroclaw/1783934562454.png`, 1600],
  'wroclaw-110-taras': [`${MDH}/WIRT/2.png`, 1600],
  'wroclaw-110-ogrod': [`${MDH}/WIRT/1.png`, 1600],
  'ogrod-pergola': [`${MDH}/PROJEKT_OGROD_1/f508aecf-9a85-491a-9b94-83ac9ea07b96.png`, 1600],
  'ogrod-plan': [`${MDH}/PROJEKT_OGROD_1/4f20ab49-9c0a-4de0-b347-215e721df176.png`, 1200],
  'skrzypiec-dom': [`${MDH}/REZYDENCJA_750/IMG_20230714_140042_872~2.jpg`, 1600],
  'skrzypiec-kuchnia': [`${MDH}/REZYDENCJA_750/316692641_602297075030610_1327830406966149343_n.jpg`, 1600],
  'skrzypiec-jadalnia': [`${MDH}/REZYDENCJA_750/316214211_602297271697257_3675976036604636096_n.jpg`, 1600],
  'nysa-kaw-render': [`${MDH}/NYSA_KAW/19a10f94-4748-4030-bebd-3e407dfc456f.png`, 1600],
  'nysa-kaw-foto': [`${MDH}/NYSA_KAW/IMG_20240119_150120_307.jpg`, 1600],
  'palac-kaczanowka': [`${MDH}/PALAC_RENOWACJA/file_000000004e9471f496dc324cd7e74474.png`, 1200],
  'park-biala-cerkiew': [`${MDH}/PARK/file_000000006a8c720aa8b11cc414372eb7.png`, 1200],
  'petro-mikula': [`${REF}/petro_portret.jpg`, 900],
}

await mkdir(OUT, { recursive: true })

for (const [name, [src, width]] of Object.entries(images)) {
  const base = sharp(src).rotate().resize({ width, withoutEnlargement: true })
  await base.clone().webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`))
  if (name.startsWith('hero')) await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`))
  console.log('ok', name)
}

// Logo: knock out the white background, then crop the "M" mark and the full lockup.
const logoSrc = `${MDH}/M DESIGN HOUSE_LOGO.png`
const { data, info } = await sharp(logoSrc).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
for (let i = 0; i < data.length; i += 4) {
  const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
  // white -> transparent, dark -> opaque; keep gold as-is
  const isGold = data[i] > 150 && data[i + 2] < 140 && data[i] - data[i + 2] > 40
  data[i + 3] = isGold ? 255 : Math.max(0, Math.min(255, Math.round((255 - lum) * 1.15)))
}
const logoPng = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer()
await sharp(logoPng).trim().resize({ width: 800 }).png().toFile(path.join(OUT, 'logo.png'))
// The mark occupies roughly the top 45% of the square
const markPng = await sharp(logoPng).extract({ left: 0, top: 0, width: info.width, height: Math.round(info.height * 0.52) }).png().toBuffer()
await sharp(markPng).trim().resize({ width: 400 }).png().toFile(path.join(OUT, 'logo-mark.png'))
console.log('ok logo')
