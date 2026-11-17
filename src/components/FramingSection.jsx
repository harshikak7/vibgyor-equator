import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FRAME_IMAGE from "../assets/custom-frame.jpeg";
// const FRAME_IMAGE = "/images/custom-frame.jpeg";

const MESSAGE =
  "Hi! I'd love to create a custom frame for my banknote collection. Could you share the available options?";

const EASE = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function FramingSection() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const whatsappUrl = `https://wa.me/${whatsappNumber || ""}?text=${encodeURIComponent(
    MESSAGE
  )}`;

  // Parallax only: the section scrolls normally
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.05, 0.9]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F5DABF] px-5 py-20 text-center font-['Plus_Jakarta_Sans'] md:py-28"
    >
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#F9E8D7_0%,#F5DABF_45%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        <motion.p
          {...rise(0)}
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6C151E]"
        >
          Made for your collection
        </motion.p>

        <motion.h2
          {...rise(0.1)}
          className="font-['Cinzel'] text-2xl leading-tight text-[#0F3D3A] md:text-4xl"
        >
          Some stories deserve
          <span className="block italic text-[#6C151E]">to be on display.</span>
        </motion.h2>

        <motion.img
          src={FRAME_IMAGE}
          alt="Custom framed collectible banknote"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          style={{ y: frameY }}
          className="my-8 max-h-[380px] w-auto max-w-[85%] object-contain drop-shadow-[0_22px_32px_rgba(45,30,20,0.3)] md:my-10 md:max-h-[460px]"
        />

        <motion.div {...rise(0.1)} className="flex flex-col items-center">
          <p className="mb-5 max-w-xs text-xs leading-6 text-[#0F3D3A]/70">
            Turn a special banknote into a keepsake you can pass on.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 bg-[#6C151E] px-6 py-4 text-[#F5DABF] transition-colors duration-300 hover:bg-[#0F3D3A]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
              Create your frame today
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}