import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const WHATSAPP_MESSAGE = "Hello Vibgyor Equator, I have a question.";

// Edit questions and answers here. Confirm the wording with the client.
const FAQS = [
  {
    question: "Are your pieces authentic?",
    answer:
      "Every coin, banknote, stamp, gemstone and antique is checked before it is listed. If you want to know more about a piece’s origin, condition or grading, message us and we’ll share what we know.",
  },
  {
    question: "How do I enquire about a piece?",
    answer:
      "Tap Enquire Now on any piece. It opens WhatsApp with the piece name already filled in, and we reply with details, photos and the price.",
  },
  {
    question: "Can I see a piece in person before buying?",
    answer:
      "Yes. You’re welcome to visit us in Santacruz East, Mumbai. Message us first so the piece you want to see is ready when you arrive.",
  },
  {
    question: "Can you find a banknote with my date?",
    answer:
      "Share your date in the “Share your date” form on the home page. We’ll check whether a banknote with that date is available and get back to you.",
  },
  {
    question: "Do you offer custom framing for banknotes?",
    answer:
      "Yes. Message us on WhatsApp with the banknote you want to frame and we’ll share the available frame options.",
  },
  {
    question: "Can you deliver outside Mumbai?",
    answer:
      "For many pieces, yes. Tell us the piece and your city on WhatsApp and we’ll confirm how it can be sent.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  const toggle = (index) =>
    setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <section
      id="faq"
      className="bg-[#F7F1E3] px-5 py-16 font-['Plus_Jakarta_Sans'] md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Left: heading + contact prompt */}
        <div className="flex flex-col justify-between gap-12 lg:sticky lg:top-24 lg:self-start lg:gap-40">
          <h2 className="font-['Cinzel'] text-3xl font-medium leading-tight text-[#0F3D3A] md:text-5xl">
            Frequently asked questions
          </h2>

          <div>
            <h3 className="font-['Cinzel'] text-lg text-[#0F3D3A]">
              Still have a question?
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-7 text-[#0F3D3A]/70">
              Ask us directly. We usually reply on WhatsApp the same day.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-6 bg-[#6C151E] px-6 py-4 text-[#F5DABF] transition-colors duration-300 hover:bg-[#0F3D3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C151E]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                Ask on WhatsApp
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        {/* Right: accordion */}
        <ul className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <li
                key={item.question}
                className={`transition-colors duration-300 ${
                  isOpen ? "bg-[#F9E8D7]" : "bg-[#F5DABF]/45 hover:bg-[#F5DABF]/70"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#6C151E] md:gap-6 md:px-6"
                  >
                    <span className="w-6 shrink-0 font-['Cinzel'] text-sm text-[#6C151E]/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 font-['Cinzel'] text-base leading-snug text-[#0F3D3A] md:text-lg">
                      {item.question}
                    </span>

                    {isOpen ? (
                      <Minus size={18} className="shrink-0 text-[#6C151E]" />
                    ) : (
                      <Plus size={18} className="shrink-0 text-[#0F3D3A]" />
                    )}
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl px-5 pb-6 pl-[3.75rem] text-sm leading-7 text-[#0F3D3A]/75 md:pl-[4.5rem] md:pr-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}