"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/types/product";

export type RevealView = "bottle" | "applied";

type ProductRevealDisplayProps = {
  product: Product;
  view: RevealView;
  imageSizes: string;
  priority?: boolean;
  aspect?: "square" | "wide";
  className?: string;
};

export function ProductRevealDisplay({
  product,
  view,
  imageSizes,
  priority = false,
  aspect = "square",
  className = "",
}: ProductRevealDisplayProps) {
  return (
    <div
      className={`relative overflow-hidden ${
        aspect === "wide" ? "aspect-[4/3]" : "aspect-square"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {view === "bottle" ? (
          <motion.div
            key="bottle"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse 95% 85% at 50% 52%, ${product.colorHex}30 0%, transparent 72%), linear-gradient(165deg, #ffffff 30%, ${product.colorHex}14)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute left-1/2 top-1/2 hidden h-[88%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] blur-3xl md:block"
              style={{ backgroundColor: `${product.colorHex}35` }}
            />
            <div
              className="absolute left-1/2 top-1/2 hidden h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl md:block"
              style={{ backgroundColor: `${product.colorHex}40` }}
            />

            <div className="relative z-10 flex h-[82%] w-[56%] items-center justify-center bg-transparent">
              <img
                src={product.bottleImage.split("?")[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                style={{
                  filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.16))",
                }}
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="applied"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={product.swatchImage}
              alt={`${product.name} applied look`}
              fill
              className="object-cover"
              sizes={imageSizes}
              priority={priority}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type RevealToggleProps = {
  view: RevealView;
  onChange: (view: RevealView) => void;
  className?: string;
};

export function RevealViewToggle({
  view,
  onChange,
  className = "",
}: RevealToggleProps) {
  return (
    <div
      className={`inline-flex rounded-full bg-white/90 p-1 shadow-md backdrop-blur-sm ${className}`}
      role="tablist"
      aria-label="Product image view"
    >
      {(
        [
          { id: "bottle" as const, label: "Bottle" },
          { id: "applied" as const, label: "On nails" },
        ] as const
      ).map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={view === tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
            view === tab.id
              ? "bg-[#ee4291] text-white shadow-sm"
              : "text-[#888] hover:text-[#ee4291]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
