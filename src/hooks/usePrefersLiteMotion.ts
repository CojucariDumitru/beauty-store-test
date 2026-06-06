"use client";

import { useReducedMotion } from "framer-motion";

/** True only when the user has enabled reduced motion in OS settings. */
export function usePrefersLiteMotion() {
  return useReducedMotion() ?? false;
}
