"use client";

import { useEffect, useState } from "react";

/** True after hydration — use to skip SSR for inputs targeted by browser extensions. */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
