"use client";

import { useState } from "react";
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

export function ProductCard({ product }: ProductCardProps) {
  const [view, setView] = useState<RevealView>("bottle");
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
  } = useShop();
  const saved = isInWishlist(product.id);

  function handleCardTap(e: React.MouseEvent) {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      setView((v) => (v === "bottle" ? "applied" : "bottle"));
    }
  }

  return (
    <article className="group flex flex-col">
      <div
        className="relative overflow-hidden rounded-2xl border border-[#f0e0e8] bg-white shadow-[0_4px_16px_#ebeff0] transition-shadow duration-300 group-hover:shadow-[0_12px_32px_rgba(238,66,145,0.18)]"
        style={{
          background: `linear-gradient(160deg, white 60%, ${product.colorHex}22)`,
        }}
        onMouseEnter={() => setView("applied")}
        onMouseLeave={() => setView("bottle")}
      >
        <Link
          href={`/product/${product.id}`}
          className="block"
          onClick={handleCardTap}
        >
          <ProductRevealDisplay
            product={product}
            view={view}
            imageSizes="(max-width: 768px) 50vw, 25vw"
          />

          {!product.inStock && (
            <span className="absolute left-3 top-3 z-30 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
              Out of stock
            </span>
          )}
        </Link>

        <div className="absolute bottom-3 right-3 z-30 flex gap-1.5 opacity-100 transition-opacity duration-200 sm:gap-2 sm:opacity-0 sm:group-hover:opacity-100">
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
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-[#111] transition-colors group-hover/title:text-[#ee4291] sm:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-[#ee4291] sm:text-lg">
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
    </article>
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
