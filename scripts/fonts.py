"""Builds the self-hosted web fonts in public/fonts from the variable TTFs in
design/reference/fonts (gitignored; from github.com/google/fonts, OFL).

Each family is limited to the weights the site uses and split into two
WOFF2 files: `latin` (Polish + English text) and `cyrillic` (Ukrainian).
src/fonts.css declares them with matching unicode-range, so a Polish or
English page never downloads the Cyrillic files.

Needs fonttools and brotli:  python3 -m pip install fonttools brotli
Run:                         python3 scripts/fonts.py
"""
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

SRC = Path('design/reference/fonts')
OUT = Path('public/fonts')

# Keep in sync with the unicode-range values in src/fonts.css.
LATIN = (
    list(range(0x20, 0x7F)) + list(range(0xA0, 0x100))  # ASCII + Latin-1 (ó, é, ², ·)
    + [0x104, 0x105, 0x106, 0x107, 0x118, 0x119, 0x141, 0x142, 0x143, 0x144,
       0x15A, 0x15B, 0x179, 0x17A, 0x17B, 0x17C]  # Ą Ć Ę Ł Ń Ś Ź Ż
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E,
       0x2022, 0x2026, 0x2039, 0x203A, 0x20AC, 0x2122]  # dashes, quotes, … € ™
)
CYRILLIC = list(range(0x400, 0x460)) + [0x490, 0x491, 0x2BC, 0x2116]  # incl. Ґ ґ ʼ №

# file stem -> (source TTF, axis limits; a number pins the axis, a tuple
# keeps a range)
FAMILIES = {
    'manrope': ('Manrope[wght].ttf', {'wght': (400, 500)}),
    'newsreader': ('Newsreader[opsz,wght].ttf', {'wght': (400, 500)}),
    # Only the hero heading uses it, at one weight; it also stands in for
    # Newsreader's missing Cyrillic.
    'source-serif-4': ('SourceSerif4[opsz,wght].ttf', {'wght': 400}),
}


def build(stem: str, source: str, limits: dict, subset: str, unicodes: list[int]) -> None:
    font = TTFont(SRC / source)
    cmap = font.getBestCmap()
    if subset == 'cyrillic' and 0x416 not in cmap:
        return  # Newsreader has no Cyrillic; fonts.css maps it to Source Serif
    # Subset first, then limit the axes: the other order trips fontTools
    # on some glyphs (KeyError in the subsetter).
    options = Options()
    options.layout_features = ['*']  # keep kerning, ligatures, ss01/cv11, tnum
    options.name_IDs = ['*']
    options.notdef_outline = True
    subsetter = Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font = instantiateVariableFont(font, limits)
    path = OUT / f'{stem}-{subset}.woff2'
    font.flavor = 'woff2'
    font.save(path)
    print('ok', path, f'{path.stat().st_size // 1024} KB')


OUT.mkdir(parents=True, exist_ok=True)
for stem, (source, limits) in FAMILIES.items():
    build(stem, source, limits, 'latin', LATIN)
    build(stem, source, limits, 'cyrillic', CYRILLIC)
