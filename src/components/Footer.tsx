import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FooterNewsletterMount } from "@/components/FooterNewsletterMount";
import { PaymentLogos } from "@/components/PaymentLogos";

const BRANDS = ["Luna", "Edlen", "Heylove", "Sova"] as const;

const SHOP_LINKS = [
  { label: "All polishes", href: "/#catalog" },
  { label: "New arrivals", href: "/#catalog" },
  { label: "Color families", href: "/#catalog" },
  { label: "Wishlist", href: "/#catalog" },
];

const HELP_LINKS = [
  { label: "Shipping & delivery", href: "#" },
  { label: "Returns & exchanges", href: "#" },
  { label: "Order tracking", href: "#" },
  { label: "FAQ", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Cookie policy", href: "#" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

function SocialIcon({ name }: { name: string }) {
  const cls = "h-4 w-4";
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls} aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "Pinterest":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.194.6 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#ee4291]/20 bg-gradient-to-b from-[#2a0f1c] via-[#1f0a15] to-[#14060e] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ee4291]">
              Stay polished
            </p>
            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              Get shade drops & salon tips
            </h2>
            <p className="mt-2 text-sm text-white/60">
              New colors, restocks, and exclusive offers — straight to your inbox.
            </p>
          </div>
          <FooterNewsletterMount />
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="inline-block bg-transparent">
            <Image
              src={assetPath("/logo.png")}
              alt="ANOVA"
              width={160}
              height={48}
              className="h-10 w-auto sm:h-12"
              unoptimized
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Professional nail polishes for every mood. 80 salon-quality shades
            from Luna, Edlen, Heylove & Sova — shipped across the United States.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[#ee4291]/50 hover:bg-[#ee4291] hover:text-white"
              >
                <SocialIcon name={label} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ee4291]">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {BRANDS.map((brand) => (
              <li key={brand}>
                <Link
                  href={`/?brand=${encodeURIComponent(brand)}`}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ee4291]">
            Customer care
          </h3>
          <ul className="mt-4 space-y-2.5">
            {HELP_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="text-sm text-white/65 transition hover:text-white"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & location */}
        <div className="col-span-2 lg:col-span-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ee4291]">
            Visit & contact
          </h3>
          <ul className="mt-4 space-y-4 text-sm text-white/65">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ee4291]" />
              <address className="not-italic leading-relaxed">
                ANOVA Flagship
                <br />
                2847 Melrose Avenue
                <br />
                Los Angeles, CA 90029
                <br />
                United States
              </address>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#ee4291]" />
              <a href="tel:+13235550142" className="transition hover:text-white">
                +1 (323) 555-0142
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#ee4291]" />
              <a
                href="mailto:hello@anova.com"
                className="transition hover:text-white"
              >
                hello@anova.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#ee4291]" />
              <span>
                Mon – Fri: 9:00 AM – 6:00 PM PT
                <br />
                Sat: 10:00 AM – 4:00 PM PT
                <br />
                Sun: Closed
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Payments */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Secure payment methods
          </p>
          <PaymentLogos />
          <p className="mt-4 text-center text-xs text-white/35">
            All transactions are encrypted and processed securely.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-xs text-white/40 sm:px-6 md:flex-row md:text-left">
          <p suppressHydrationWarning>© {year} ANOVA. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-4 md:justify-end">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
