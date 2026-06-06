"use client";

import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";

type StoreLogoProps = {
  href?: string;
  className?: string;
};

export function StoreLogo({ href = "/", className = "" }: StoreLogoProps) {
  return (
    <Link
      href={href}
      className={`inline-block shrink-0 bg-transparent ${className}`}
      aria-label="ANOVA home"
    >
      <Image
        src={assetPath("/logo.png")}
        alt="ANOVA"
        width={120}
        height={36}
        className="h-8 w-auto md:h-10"
        sizes="(max-width: 768px) 96px, 120px"
        priority
        unoptimized
      />
    </Link>
  );
}
