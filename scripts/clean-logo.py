"""Regenerate transparent logo from original asset. Run: py scripts/clean-logo.py"""
from pathlib import Path
import io

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(
    r"C:\Users\abrax\.cursor\projects\c-Users-abrax-OneDrive-Desktop-beauty-store\assets"
    r"\c__Users_abrax_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images"
    r"_image-c162ac6e-a510-4bb7-988c-58a5f8105113.png"
)
DST = ROOT / "public" / "logo.png"


def main() -> None:
    result = remove(SRC.read_bytes())
    img = Image.open(io.BytesIO(result)).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.save(DST)
    print(f"Saved transparent logo to {DST} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
