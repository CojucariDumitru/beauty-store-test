"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import {
  ProductRevealDisplay,
  RevealViewToggle,
  type RevealView,
} from "@/components/ProductRevealDisplay";

export function ProductGallery({ product }: { product: Product }) {
  const [view, setView] = useState<RevealView>("bottle");

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-[#f0e0e8] bg-white shadow-[0_4px_16px_#ebeff0]">
        <ProductRevealDisplay
          product={product}
          view={view}
          imageSizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <RevealViewToggle
          view={view}
          onChange={setView}
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
        />
      </div>

      <div className="flex gap-3">
        <Thumb
          label="Bottle"
          active={view === "bottle"}
          onClick={() => setView("bottle")}
        >
          <Image
            src={product.bottleImage.split("?")[0]}
            alt=""
            fill
            className="object-contain p-1"
            sizes="80px"
            unoptimized
          />
        </Thumb>
        <Thumb
          label="Applied look"
          active={view === "applied"}
          onClick={() => setView("applied")}
        >
          <Image
            src={product.swatchImage}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        </Thumb>
        <div
          className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 border-[#f0e0e8] bg-white"
          title={product.colorName}
        >
          <span
            className="h-10 w-10 rounded-full border border-black/10 shadow-inner"
            style={{ backgroundColor: product.colorHex }}
          />
          <span className="mt-1 text-[9px] font-medium text-[#888]">Shade</span>
        </div>
      </div>
    </div>
  );
}

function Thumb({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
        active
          ? "border-[#ee4291] ring-2 ring-[#ee4291]/20"
          : "border-[#f0e0e8] hover:border-[#ee4291]/50"
      }`}
      aria-label={label}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
