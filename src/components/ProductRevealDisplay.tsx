"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

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
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Glow layers — sized to match the tall bottle */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[88%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] blur-3xl"
              style={{ backgroundColor: `${product.colorHex}35` }}
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{ backgroundColor: `${product.colorHex}60` }}
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.14, 1], opacity: [0.4, 0.7, 0.4] }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />

            <motion.div
              className="relative z-10 flex h-[82%] w-[56%] items-center justify-center bg-transparent"
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.92 }}
              animate={
                reduceMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {
                      opacity: 1,
                      y: [0, -11, 0],
                      scale: 1,
                      rotate: [-1.5, 1.5, -1.5],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0.4 }
                  : {
                      y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                      rotate: {
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      opacity: { duration: 0.4 },
                    }
              }
            >
              {/* Native img keeps PNG alpha reliable (no matte from next/image) */}
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
            </motion.div>

            {/* Gloss sweep across bottle */}
            {!reduceMotion && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-y-[18%] w-1/4 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  animate={{ x: ["-120%", "420%"] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="applied"
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
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
