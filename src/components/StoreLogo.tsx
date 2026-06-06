"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type StoreLogoProps = {
  size?: "sm" | "md" | "lg";
  href?: string;
};

const sizes = {
  sm: { w: 120, h: 52 },
  md: { w: 170, h: 74 },
  lg: { w: 210, h: 92 },
};

export function StoreLogo({ size = "md", href = "/" }: StoreLogoProps) {
  const { w, h } = sizes[size];

  return (
    <Link href={href} className="inline-block shrink-0 bg-transparent">
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative bg-transparent"
        style={{ width: w, height: h }}
      >
        <Image
          src="/logo.png"
          alt="Beauty Store"
          fill
          className="object-contain object-center"
          sizes={`${w}px`}
          priority
          unoptimized
        />
      </motion.div>
    </Link>
  );
}
