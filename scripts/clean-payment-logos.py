"""Clean payment logos — transparent PNGs, uniform canvas, no white backdrop."""
import io
from pathlib import Path

from PIL import Image, ImageEnhance
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
ASSETS = Path(
    r"C:\Users\abrax\.cursor\projects\c-Users-abrax-OneDrive-Desktop-beauty-store\assets"
)
OUT = ROOT / "public" / "payments"

# Every logo lands on the same transparent canvas for even footer sizing
CANVAS_W = 96
CANVAS_H = 40

LOGOS: list[tuple[str, Path, str]] = [
    (
        "visa",
        ASSETS
        / "c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-968c3b51-f4bb-4184-8c4e-0a47160f35ad.png",
        "rembg",
    ),
    (
        "mastercard",
        ASSETS
        / "c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-26ef86bc-c6f1-4681-a2ec-84d823bef439.png",
        "rembg",
    ),
    (
        "amex",
        ASSETS
        / "c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-893c2eb8-ed0c-4c9e-84ec-b52b6ff2332e.png",
        "white",
    ),
    (
        "paypal",
        ASSETS
        / "c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-2b4f3a48-5029-4868-ba1f-957e9ec0bcb6.png",
        "black",
    ),
    (
        "apple-pay",
        ASSETS
        / "c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-07c3f00e-8867-4c59-9351-5828d998c817.png",
        "white",
    ),
    (
        "google-pay",
        ASSETS
        / "c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-b18cf2f5-9ca2-49c8-9055-ad3c55768125.png",
        "rembg",
    ),
]


def chroma(r: int, g: int, b: int) -> int:
    return max(r, g, b) - min(r, g, b)


def trim_transparent(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def strip_white(img: Image.Image, threshold: int = 232) -> Image.Image:
    """Remove white / near-white pixels — keeps logo marks only."""
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                px[x, y] = (0, 0, 0, 0)
            elif a > 0:
                px[x, y] = (r, g, b, 255)
    return img


def strip_black(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            lum = (r + g + b) / 3
            c = chroma(r, g, b)
            if lum < 28 and c < 18:
                px[x, y] = (0, 0, 0, 0)
            else:
                px[x, y] = (r, g, b, 255)
    return img


def solidify_alpha(img: Image.Image) -> Image.Image:
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            px[x, y] = (r, g, b, 255 if a > 40 else 0)
    return strip_white(img, threshold=240)


def upscale(img: Image.Image, min_edge: int = 280) -> Image.Image:
    w, h = img.size
    edge = max(w, h)
    if edge >= min_edge:
        return img
    scale = min_edge / edge
    return img.resize(
        (max(1, round(w * scale)), max(1, round(h * scale))),
        Image.Resampling.LANCZOS,
    )


def rembg_clean(src: Path) -> Image.Image:
    cut = Image.open(io.BytesIO(remove(src.read_bytes()))).convert("RGBA")
    return solidify_alpha(cut)


def clean_source(name: str, src: Path, mode: str) -> Image.Image:
    if mode == "rembg":
        img = rembg_clean(src)
    elif mode == "white":
        img = strip_white(upscale(Image.open(src).convert("RGBA")))
    elif mode == "black":
        img = strip_black(upscale(Image.open(src).convert("RGBA")))
        img = ImageEnhance.Contrast(img).enhance(1.1)
    else:
        raise ValueError(mode)

    img = trim_transparent(img)
    img = ImageEnhance.Contrast(img).enhance(1.06)
    img = ImageEnhance.Sharpness(img).enhance(1.08)
    return img


def fit_canvas(img: Image.Image) -> Image.Image:
    """Scale every mark to the same visual height, centered on transparent canvas."""
    img = trim_transparent(img)
    w, h = img.size
    if w == 0 or h == 0:
        return img

    max_w = CANVAS_W * 0.94
    max_h = CANVAS_H * 0.94

    # Same height for all — Amex badge grows to match Visa / PayPal
    scale = max_h / h
    nw, nh = round(w * scale), round(h * scale)

    if nw > max_w:
        scale = max_w / w
        nw, nh = round(w * scale), round(h * scale)

    img = img.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    x = (CANVAS_W - nw) // 2
    y = (CANVAS_H - nh) // 2
    canvas.paste(img, (x, y), img)
    return canvas


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, src, mode in LOGOS:
        if not src.exists():
            raise FileNotFoundError(src)
        out = fit_canvas(clean_source(name, src, mode))
        dest = OUT / f"{name}.png"
        out.save(dest, optimize=True)
        print(f"Wrote {dest} ({out.size[0]}x{out.size[1]})")


if __name__ == "__main__":
    main()
