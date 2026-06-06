import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BRANDS = ["Luna", "Edlen", "Heylove", "Sova"];

const COLOR_FAMILIES = [
  { family: "Pink", hex: "#E8A0A0", names: ["Rose Quartz", "Blush Petal", "Cotton Candy", "Ballet Slipper"] },
  { family: "Red", hex: "#C41E3A", names: ["Cherry Pop", "Ruby Rush", "Scarlet Kiss", "Crimson Veil"] },
  { family: "Coral", hex: "#FF6B6B", names: ["Coral Sunset", "Peach Sorbet", "Tropical Kiss", "Sunset Glow"] },
  { family: "Orange", hex: "#F59E42", names: ["Amber Hour", "Tangerine Dream", "Copper Spice", "Mango Light"] },
  { family: "Yellow", hex: "#F5D547", names: ["Lemon Zest", "Golden Ray", "Honey Drop", "Sunbeam"] },
  { family: "Green", hex: "#6BBF8A", names: ["Mint Frost", "Sage Whisper", "Jade Pool", "Forest Dew"] },
  { family: "Blue", hex: "#4A7FD4", names: ["Midnight Tide", "Ocean Mist", "Denim Sky", "Arctic Blue"] },
  { family: "Purple", hex: "#9B7FD4", names: ["Lavender Mist", "Violet Haze", "Plum Velvet", "Amethyst"] },
  { family: "Neutral", hex: "#C4B8AE", names: ["Nude Blush", "Taupe Silk", "Sand Stone", "Ivory Veil"] },
  { family: "Multi", hex: "#EE4291", names: ["Prism Shift", "Aurora Wave", "Opal Flash", "Rainbow Sheer"] },
];

const BOTTLE_IMAGE = "/products/bottle.png";
const SWATCH_IMAGE = "/products/swatch.png";

const SHADES_PER_BRAND = 20;

const products = [];
let globalIndex = 0;

for (const brand of BRANDS) {
  for (let i = 0; i < SHADES_PER_BRAND; i++) {
    const colorGroup = COLOR_FAMILIES[i % COLOR_FAMILIES.length];
    const colorName = colorGroup.names[i % colorGroup.names.length];
    const suffix = i >= colorGroup.names.length ? ` ${Math.floor(i / colorGroup.names.length) + 1}` : "";
    const price = 10 + (i % 8) + (brand.length % 3);
    const inStock = (globalIndex + i) % 7 !== 0;

    products.push({
      id: `${brand.toLowerCase()}-${colorGroup.family.toLowerCase()}-${i + 1}`,
      name: `${brand} ${colorName}${suffix}`,
      brand,
      colorName: `${colorName}${suffix}`,
      colorHex: colorGroup.hex,
      colorFamily: colorGroup.family,
      price,
      description: `${brand} professional nail polish in ${colorName}${suffix}. ${colorGroup.family} family shade with salon-quality coverage and long-lasting shine.`,
      bottleImage: BOTTLE_IMAGE,
      swatchImage: SWATCH_IMAGE,
      inStock,
      published: true,
      createdAt: new Date(2026, 0, 1 + globalIndex).toISOString(),
    });
    globalIndex++;
  }
}

const outPath = join(__dirname, "..", "data", "products.json");
writeFileSync(outPath, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products (${BRANDS.length} brands × ${SHADES_PER_BRAND} shades)`);
