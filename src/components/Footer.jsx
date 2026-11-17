import React from "react";
import { Link } from "react-router-dom";

const BUSINESS_EMAIL = "equatorvibgyor@gmail.com";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL; // optional

const COLLECTION_LINKS = [
  { label: "Gems & Jewellery", to: "/gems-jewellery" },
  { label: "Coins", to: "/rare-finds/coins" },
  { label: "Banknotes", to: "/rare-finds/banknotes" },
  { label: "Stamps", to: "/rare-finds/stamps" },
  { label: "Antiques", to: "/antiques" },
];

const linkClass =
  "text-[#F5DABF]/75 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5DABF]";

const headingClass =
  "mb-4 font-['Cinzel'] text-sm tracking-[0.12em] text-[#F5DABF]";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#6C151E] font-['Plus_Jakarta_Sans'] text-[#F5DABF]">
      <div className="mx-auto max-w-6xl px-5 pt-16 md:px-10 md:pt-20">
        {/* Top: brand note + link columns */}
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div className="max-w-xs">
            <p className="font-['Cinzel'] text-xl leading-snug text-[#F9E8D7]">
              Pieces with a story worth keeping.
            </p>
            <p className="mt-4 text-xs leading-6 text-[#F5DABF]/70">
              Gems, coins, banknotes, stamps and antiques, from Santacruz East,
              Mumbai.
            </p>
          </div>

          <nav aria-label="Collections">
            <h2 className={headingClass}>Collections</h2>
            <ul className="space-y-3 text-xs">
              {COLLECTION_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h2 className={headingClass}>Explore</h2>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="/#your-date" className={linkClass}>
                  Share your date
                </a>
              </li>
              <li>
                <Link to="/faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Get in touch</h2>
            <ul className="space-y-3 text-xs">
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`} className={`${linkClass} break-all`}>
                  {BUSINESS_EMAIL}
                </a>
              </li>
              {WHATSAPP_NUMBER && (
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {INSTAGRAM_URL && (
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Instagram
                  </a>
                </li>
              )}
              <li className="text-[#F5DABF]/60">Santacruz East, Mumbai</li>
            </ul>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[#F5DABF]/20 pt-5 text-[11px] text-[#F5DABF]/55 md:mt-20">
          <p>© {year} Vibgyor Equator. All rights reserved.</p>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-4 select-none whitespace-nowrap text-center font-['Cinzel'] text-[10.5vw] font-medium leading-[0.85] text-[#F5DABF] translate-y-[14%]"
      >
        Vibgyor Equator
      </p>
    </footer>
  );
}