"""Regenerate transparent ANOVA wordmark — pink/white bg removed, text only."""
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(
    r"C:\Users\abrax\.cursor\projects\c-Users-abrax-OneDrive-Desktop-beauty-store\assets"
    r"\c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images"
    r"_image-1442ba5f-e35d-4f95-b79e-d1ca8926ee3f.png"
)
DST = ROOT / "public" / "logo.png"


def color_dist(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def is_light_bg(r: int, g: int, b: int) -> bool:
    lum = (r + g + b) / 3
    chroma = max(r, g, b) - min(r, g, b)
    # Blush pink / white backdrop
    if lum > 218 and chroma < 55:
        return True
    if r > 215 and g > 195 and b > 200 and r >= g:
        return True
    return False


def flood_strip_pink(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((0, x))
        q.append((h - 1, x))
    for y in range(h):
        q.append((y, 0))
        q.append((y, w - 1))

    while q:
        y, x = q.popleft()
        if visited[y][x]:
            continue
        visited[y][x] = True

        r, g, b, a = px[x, y]
        if a == 0 or not is_light_bg(r, g, b):
            continue

        px[x, y] = (0, 0, 0, 0)
        if y > 0:
            q.append((y - 1, x))
        if y < h - 1:
            q.append((y + 1, x))
        if x > 0:
            q.append((y, x - 1))
        if x < w - 1:
            q.append((y, x + 1))

    # Remove leftover light fringe pixels inside letter counters, etc.
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a and is_light_bg(r, g, b):
                px[x, y] = (0, 0, 0, 0)
            elif a:
                px[x, y] = (r, g, b, 255)

    return img


def trim_transparent(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def main() -> None:
    if not SRC.exists():
        raise FileNotFoundError(SRC)

    img = flood_strip_pink(Image.open(SRC))
    img = trim_transparent(img)
    img.save(DST, optimize=True)
    print(f"Saved transparent logo to {DST} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
