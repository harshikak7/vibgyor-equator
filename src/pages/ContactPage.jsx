
import React from "react";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import ClosingCta from "../components/ClosingCta";
import Footer from "../components/Footer";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const HEADING = "font-['Cinzel']";
const BODY = "font-['Plus_Jakarta_Sans']";

export default function ContactPage() {
  const phone = (WHATSAPP_NUMBER || "").replace(/\D/g, "");

  const openWhatsApp = () => {
    if (!phone) {
      alert("WhatsApp number is not configured.");
      return;
    }

    const message =
      "Hello Vibgyor Equator, I'd love to know more about your collection.";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F1E3]">

      {/* LET'S CONNECT */}
      <section className="px-[6%] pb-9 pt-9 sm:pb-12 sm:pt-12 md:py-20">
        <div className="mx-auto max-w-[1300px]">

          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-20">

            {/* INTRODUCTION */}
            <div>
              <p
                className={`${BODY} mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6C151E] sm:mb-5`}
              >
                Let's connect
              </p>

              <h1
                className={`${HEADING} text-[clamp(2.2rem,8vw,5.5rem)] font-medium leading-[1.12] text-[#0F3D3A]`}
              >
                Get in touch
                <br />
                <span className="italic text-[#6C151E]">with us.</span>
              </h1>

              <p
                className={`${BODY} mt-4 max-w-md text-[11px] leading-6 text-[#0F3D3A]/65 sm:mt-5 sm:text-xs sm:leading-7`}
              >
                Have a question about a piece, our collection or an enquiry?
                We'd be happy to hear from you. Connect with us and let us
                help you find something worth treasuring.
              </p>
            </div>

            {/* FOUNDER DETAILS */}
            <div className="flex flex-col">

              {/* FOUNDER */}
              <div className="border-t border-[#0F3D3A]/20 py-5 sm:py-7">
                <p
                  className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}
                >
                  Founder
                </p>

                <h2
                  className={`${HEADING} text-xl font-medium text-[#0F3D3A] sm:text-2xl md:text-3xl`}
                >
                  Vidisha Dalwani
                </h2>

                <p
                  className={`${BODY} mt-2 max-w-sm text-[11px] leading-6 text-[#0F3D3A]/65 sm:mt-3 sm:text-xs`}
                >
                  The vision behind Vibgyor Equator, bringing together
                  thoughtfully curated pieces and timeless finds.
                </p>
              </div>

              {/* CO-FOUNDER */}
              <div className="border-t border-[#0F3D3A]/20 py-5 sm:py-7">
                <p
                  className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6C151E]`}
                >
                  Co-Founder & Head of Communication
                </p>

                <h2
                  className={`${HEADING} text-xl font-medium text-[#0F3D3A] sm:text-2xl md:text-3xl`}
                >
                  Ajay Dalwani
                </h2>

                <p
                  className={`${BODY} mt-2 max-w-sm text-[11px] leading-6 text-[#0F3D3A]/65 sm:mt-3 sm:text-xs`}
                >
                  For enquiries, further information and assistance with
                  our collections, feel free to get in touch.
                </p>

                {/* WHATSAPP */}
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className={`${BODY} mt-4 inline-flex items-center gap-2.5 border border-[#0F3D3A] bg-[#0F3D3A] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#F5DABF] transition-all duration-300 hover:border-[#6C151E] hover:bg-[#6C151E] sm:mt-6 sm:gap-3 sm:px-6 sm:py-3.5`}
                >
                  <MessageCircle size={14} />
                  Contact via WhatsApp
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <ClosingCta />
      <Footer />
    </main>
  );
}
