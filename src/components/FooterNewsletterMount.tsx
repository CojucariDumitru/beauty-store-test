"use client";

import dynamic from "next/dynamic";

export const FooterNewsletterMount = dynamic(
  () =>
    import("@/components/FooterNewsletter").then((m) => m.FooterNewsletter),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
        aria-hidden
      >
        <div className="h-[46px] flex-1 rounded-xl border border-white/15 bg-white/10" />
        <div className="h-[46px] rounded-xl bg-[#ee4291] px-6 text-sm font-semibold text-white sm:min-w-[7.5rem] flex items-center justify-center">
          Subscribe
        </div>
      </div>
    ),
  },
);
