"""Regenerate transparent product bottle PNG. Run: py scripts/clean-bottle.py"""
import io
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(
    r"C:\Users\abrax\.cursor\projects\c-Users-abrax-OneDrive-Desktop-beauty-store\assets"
    r"\c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images"
    r"_image-7968ebab-076c-4520-971c-42d7993271fa.png"
)
DST = ROOT / "public" / "products" / "bottle.png"


def chroma(r: int, g: int, b: int) -> int:
    return max(r, g, b) - min(r, g, b)


def is_light_backdrop_halo(r: int, g: int, b: int, a: int) -> bool:
    """Only strip obvious studio backdrop halos — never metallic label pixels."""
    lum = (r + g + b) / 3
    c = chroma(r, g, b)
    # Off-white fringe only (silver label is darker / more reflective)
    return lum > 215 and c < 22 and a < 245


def build_from_rembg_mask(original: Image.Image) -> Image.Image:
    cutout = Image.open(
        io.BytesIO(
            remove(
                SRC.read_bytes(),
                alpha_matting=True,
                alpha_matting_foreground_threshold=240,
                alpha_matting_background_threshold=10,
                alpha_matting_erode_size=6,
            )
        )
    ).convert("RGBA")

    original = original.convert("RGBA")
    mask = cutout.split()[3].resize(original.size, Image.Resampling.LANCZOS)

    out = original.copy()
    out.putalpha(mask)
    return out


def scrub_matte_only(img: Image.Image) -> Image.Image:
    pixels = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a < 8:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            # Black rembg matte only — preserves silver/chrome LUNA text
            if max(r, g, b) < 45:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            if is_light_backdrop_halo(r, g, b, a):
                pixels[x, y] = (0, 0, 0, 0)

    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(0.5))
    img = Image.merge("RGBA", (r, g, b, a))

    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def main() -> None:
    DST.parent.mkdir(parents=True, exist_ok=True)
    original = Image.open(SRC)
    img = scrub_matte_only(build_from_rembg_mask(original))
    img.save(DST, optimize=True)

    flat = list(img.getdata())
    silver = sum(
        1
        for p in flat
        if p[3] > 200 and 120 < (p[0] + p[1] + p[2]) / 3 < 210 and chroma(p[0], p[1], p[2]) < 35
    )
    total = img.size[0] * img.size[1]
    print(f"Saved transparent bottle to {DST} ({img.size[0]}x{img.size[1]})")
    print(f"Metallic label pixels preserved: {silver}")


if __name__ == "__main__":
    main()
