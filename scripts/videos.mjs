// Builds public/videos from design/reference/videos (gitignored originals).
// Re-encodes every .mp4 to web-sized H.264 with faststart so playback begins
// before the whole file has downloaded. Needs ffmpeg on PATH.
// Also writes the portrait crops listed in CROPS (phones load those instead).
// Run: node scripts/videos.mjs
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'design/reference/videos'
const OUT = 'public/videos'

await mkdir(OUT, { recursive: true })

const hasAudio = (file) =>
  execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', file])
    .toString()
    .trim() !== ''

// 3:4 window over the hero loop at the 38% horizontal position the mobile CSS
// uses (index.css), so a portrait phone sees the same framing at full
// sharpness for less than half the bytes. Hero.tsx keeps the media query.
const CROPS = [
  { src: 'mdh-hero-loop-pergola.mp4', out: 'mdh-hero-loop-pergola-portrait.mp4', crop: 'crop=ih*3/4:ih:(iw-ih*3/4)*0.38:0' },
]

const kb = (file) => stat(file).then((s) => Math.round(s.size / 1024))

for (const name of (await readdir(SRC)).filter((f) => f.endsWith('.mp4')).sort()) {
  const src = path.join(SRC, name)
  const out = path.join(OUT, name)
  const audio = hasAudio(src) ? ['-c:a', 'aac', '-b:a', '96k'] : ['-an']
  execFileSync('ffmpeg', [
    '-y', '-v', 'error', '-i', src,
    '-vf', "scale='min(1280,iw)':-2,fps=30",
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    ...audio,
    '-movflags', '+faststart',
    out,
  ])
  console.log('ok', name, `${await kb(src)} KB -> ${await kb(out)} KB`)
}

for (const { src: name, out: outName, crop } of CROPS) {
  const src = path.join(SRC, name)
  const out = path.join(OUT, outName)
  execFileSync('ffmpeg', [
    '-y', '-v', 'error', '-i', src,
    '-vf', `${crop},fps=30`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-an', '-movflags', '+faststart',
    out,
  ])
  console.log('ok', outName, `${await kb(src)} KB -> ${await kb(out)} KB`)
}
