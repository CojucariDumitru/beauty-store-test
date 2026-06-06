"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackToShopLinkProps = {
  label?: string;
  shortLabel?: string;
};

export function BackToShopLink({
  label = "Back to shop",
  shortLabel = "Shop",
}: BackToShopLinkProps) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 rounded-xl border border-[#f0e0e8] bg-[#fafafa] px-3 py-2.5 text-xs font-semibold text-[#ee4291] shadow-sm transition-all hover:border-[#ee4291] hover:bg-[#ee4291] hover:text-white hover:shadow-md hover:shadow-[#ee4291]/25 sm:px-4 sm:text-sm"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/80 transition-colors group-hover:bg-white/20">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 sm:h-4 sm:w-4" />
      </span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{shortLabel}</span>
    </Link>
  );
}
