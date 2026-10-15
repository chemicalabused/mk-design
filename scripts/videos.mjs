// Builds public/videos from design/reference/videos (gitignored originals).
// Re-encodes every .mp4 to web-sized H.264 with faststart so playback begins
// before the whole file has downloaded. Needs ffmpeg on PATH.
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
  const kb = (file) => stat(file).then((s) => Math.round(s.size / 1024))
  console.log('ok', name, `${await kb(src)} KB -> ${await kb(out)} KB`)
}
