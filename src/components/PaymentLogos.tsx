import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const LOGOS = [
  { id: "visa", src: "/payments/visa.png", label: "Visa" },
  { id: "mastercard", src: "/payments/mastercard.png", label: "Mastercard" },
  { id: "amex", src: "/payments/amex.png", label: "American Express" },
  { id: "paypal", src: "/payments/paypal.png", label: "PayPal" },
  { id: "apple-pay", src: "/payments/apple-pay.png", label: "Apple Pay" },
  { id: "google-pay", src: "/payments/google-pay.png", label: "Google Pay" },
] as const;

const CARD = "h-12 w-[4.75rem]";

export function PaymentLogos() {
  return (
    <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
      {LOGOS.map(({ id, src, label }) => (
        <li key={id}>
          <div
            className={`flex ${CARD} items-center justify-center rounded-lg border border-white/15 bg-white px-2 py-1.5 shadow-md sm:px-2.5`}
          >
            <Image
              src={assetPath(src)}
              alt={label}
              width={96}
              height={40}
              className="h-9 w-full object-contain object-center"
              unoptimized
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
