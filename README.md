# Beauty-Store — Test Build

**This is a disposable test version.** Delete the entire `beauty-store-test` folder if it doesn't meet your expectations.

## What's included

- Layered product cards — bottle lifts on hover, swatch/applied look underneath
- Quick view modal
- Cart drawer (saved in browser localStorage)
- Wishlist drawer (saved in browser localStorage)
- Product detail pages
- Admin page to add/delete products (JSON file storage)
- 4 demo nail polish products pre-loaded

## Run locally

```bash
cd beauty-store-test
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default password: `beauty-test`
- Add products with two image URLs:
  - **Bottle** — top layer on the card
  - **Applied look** — bottom layer (on nails / swatch)

## Delete this test

```bash
# From the beauty store folder — remove the whole test project
rm -rf beauty-store-test
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force "beauty-store-test"
```

## What's NOT in this test

- Cloudflare / Clerk / Stripe (planned for the real build)
- Real checkout
- File uploads (use image URLs for now)
- User accounts

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow that builds a static export and publishes it to GitHub Pages.

### One-time setup

1. Create a new repository on GitHub (e.g. `beauty-store-test`).
2. Push this folder to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/beauty-store-test.git
git add .
git commit -m "Add beauty store test build with GitHub Pages deploy"
git push -u origin master
```

3. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. After the workflow runs, the site will be live at:

`https://YOUR_USERNAME.github.io/beauty-store-test/`

### Notes

- The storefront, product pages, cart, and wishlist work on GitHub Pages.
- The **admin page does not work** on GitHub Pages (it needs server API routes). Use admin locally with `npm run dev`.
- To preview the static build locally:

```bash
npm run build:pages
npx serve out
```

- If you deploy to a root user site (`username.github.io` with no repo name in the URL), edit `.github/workflows/deploy.yml` and remove the `NEXT_PUBLIC_BASE_PATH` line.

## Next steps (when you're ready)

Say **START** again for the production stack: Cloudflare Workers, D1, Clerk, R2.
