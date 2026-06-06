"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { useShop } from "@/context/ShopContext";
import {
  ProductRevealDisplay,
  type RevealView,
} from "@/components/ProductRevealDisplay";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const [view, setView] = useState<RevealView>("bottle");
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
  } = useShop();
  const saved = isInWishlist(product.id);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex flex-col"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-[#f0e0e8] bg-white shadow-[0_4px_16px_#ebeff0] transition-shadow duration-300 group-hover:shadow-[0_12px_32px_rgba(238,66,145,0.18)]"
        style={{
          background: `linear-gradient(160deg, white 60%, ${product.colorHex}22)`,
        }}
        onMouseEnter={() => setView("applied")}
        onMouseLeave={() => setView("bottle")}
      >
        <Link href={`/product/${product.id}`} className="block">
          <ProductRevealDisplay
            product={product}
            view={view}
            imageSizes="(max-width: 768px) 50vw, 25vw"
          />

          <span
            className={`pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm transition ${
              view === "applied"
                ? "bg-black/50 text-white"
                : "bg-white/80 text-[#888]"
            }`}
          >
            {view === "applied" ? "On nails" : "Hover to preview"}
          </span>

          {!product.inStock && (
            <span className="absolute left-3 top-3 z-30 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
              Out of stock
            </span>
          )}
        </Link>

        <div className="absolute bottom-3 right-3 z-30 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <IconButton
            label="Quick view"
            onClick={() => openQuickView(product)}
          >
            <Eye className="h-4 w-4" />
          </IconButton>
          <IconButton
            label={saved ? "Remove from wishlist" : "Add to wishlist"}
            active={saved}
            onClick={() => toggleWishlist(product)}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </IconButton>
          <IconButton
            label="Add to cart"
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div className="mt-3 px-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#ee4291]">
          {product.brand}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="h-3 w-3 shrink-0 rounded-full border border-black/10"
            style={{ backgroundColor: product.colorHex }}
          />
          <p className="text-xs uppercase tracking-wide text-[#888]">
            {product.colorName}
          </p>
        </div>
        <Link href={`/product/${product.id}`} className="group/title block">
          <h3 className="mt-1 font-medium text-[#111] transition-colors group-hover/title:text-[#ee4291]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-lg font-semibold text-[#ee4291]">
            ${product.price.toFixed(2)}
          </p>
          <Link
            href={`/product/${product.id}`}
            className="rounded-lg bg-[#ee4291]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#ee4291] transition hover:bg-[#ee4291] hover:text-white"
          >
            View page
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function IconButton({
  children,
  label,
  onClick,
  active,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-md transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-[#ee4291] text-white"
          : "bg-white text-[#ee4291] hover:bg-[#ee4291] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
