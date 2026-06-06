const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix local static paths for GitHub Pages subfolder deploys. */
export function assetPath(src: string): string {
  if (!src) return src;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${BASE}${path}`;
}
