"use client";

import { useClientMounted } from "@/hooks/useClientMounted";

export function FooterNewsletter() {
  const mounted = useClientMounted();

  if (!mounted) {
    return (
      <div
        className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
        aria-hidden
      >
        <div className="h-[46px] flex-1 rounded-xl border border-white/15 bg-white/10" />
        <div className="h-[46px] rounded-xl bg-[#ee4291]/50 px-6 sm:min-w-[7.5rem]" />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ee4291] focus:ring-2 focus:ring-[#ee4291]/30"
      />
      <button
        type="button"
        className="rounded-xl bg-[#ee4291] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ee4291]/25 transition hover:bg-[#e13e8a]"
      >
        Subscribe
      </button>
    </div>
  );
}
