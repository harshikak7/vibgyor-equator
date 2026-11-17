import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const BUSINESS_EMAIL = "equatorvibgyor@gmail.com";

const WHATSAPP_MESSAGE =
  "Hello Vibgyor Equator, I'm looking for a particular piece. Could you help me find it?";

const EASE = [0.22, 1, 0.36, 1];

export default function ClosingCta() {
  const reduceMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  // One reveal for the whole block, skipped when the visitor prefers less motion
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.9, ease: EASE },
      };

  return (
    <section
      id="closing-cta"
      className="bg-[#0F3D3A] px-5 py-20 text-center font-['Plus_Jakarta_Sans'] md:px-10 md:py-28"
    >
      <motion.div {...reveal} className="mx-auto flex max-w-3xl flex-col items-center">
        <h2 className="font-['Cinzel'] text-3xl leading-tight text-[#F5DABF] md:text-6xl">
          Looking for something
          <span className="block italic text-[#F9E8D7]">particular?</span>
        </h2>

        <p className="mt-6 max-w-md text-sm leading-7 text-[#F5DABF]/75 md:text-base md:leading-8">
          Tell us the coin, note, stamp, gemstone or antique you have in mind.
          We’ll search our collection and let you know what we have.
        </p>

        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 bg-[#F5DABF] px-7 py-4 text-[#0F3D3A] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5DABF]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
              Message us on WhatsApp
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <a
            href={`mailto:${BUSINESS_EMAIL}`}
            className="border-b border-[#F5DABF]/40 pb-1 text-xs text-[#F5DABF]/80 transition-colors duration-300 hover:border-[#F5DABF] hover:text-[#F5DABF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5DABF]"
          >
            Or email {BUSINESS_EMAIL}
          </a>
        </div>
      </motion.div>
    </section>
  );
}