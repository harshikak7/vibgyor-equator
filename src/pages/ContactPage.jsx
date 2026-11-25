
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

      {/* CONTACT HERO */}
      <section className="px-[6%] py-12 md:py-20">
        <div className="mx-auto max-w-[1300px]">

          {/* TOP LABEL */}
          {/* <div className="mb-12 border-b border-[#0F3D3A]/15 pb-4">
            <p className={`${BODY} text-[9px] font-medium uppercase tracking-[0.2em] text-[#0F3D3A]/60`}>
              Vibgyor Equator / Contact
            </p>
          </div> */}

          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between">
              <div>
                <p className={`${BODY} mb-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6C151E]`}>
                  Let's connect
                </p>

                <h1 className={`${HEADING} text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[1.15] text-[#0F3D3A]`}>
                  Get 
                  <br />
                  in touch <br />
                  <span className="italic text-[#6C151E]">with us.</span>
                </h1>

                <p className={`${BODY} mt-4 max-w-md text-[11px] leading-7 text-[#0F3D3A]/65`}>
                  Have a question about a piece, our collection or an enquiry?
                  We'd be happy to hear from you. Connect with us and let us
                  help you find something worth treasuring.
                </p>
              </div>

              {/* LOCATION */}
              <div className="mt-12 border-t border-[#0F3D3A]/15 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-1 text-[#6C151E]" />

                  <div>
                    <p className={`${BODY} text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6C151E]`}>
                      Location
                    </p>

                    <p className={`${HEADING} mt-2 text-lg text-[#0F3D3A]`}>
                      Mumbai, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - CONTACT DETAILS */}
            <div className="flex flex-col justify-center">

              {/* FOUNDER */}
              <div className="border-t border-[#0F3D3A]/20 py-7">
                <p className={`${BODY} mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}>
                  Founder
                </p>

                <h2 className={`${HEADING} text-2xl font-medium text-[#0F3D3A] md:text-3xl`}>
                  Vidisha Dalwani
                </h2>

                <p className={`${BODY} mt-3 max-w-sm text-[11px] leading-6 text-[#0F3D3A]/65`}>
                  The vision behind Vibgyor Equator, bringing together
                  thoughtfully curated pieces and timeless finds.
                </p>
              </div>

              {/* CO-FOUNDER */}
              <div className="border-t border-[#0F3D3A]/20 py-7">
                <p className={`${BODY} mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}>
                  Co-Founder & Head of Communication
                </p>

                <h2 className={`${HEADING} text-2xl font-medium text-[#0F3D3A] md:text-3xl`}>
                  Ajay Dalwani
                </h2>

                <p className={`${BODY} mt-3 max-w-sm text-[11px] leading-6 text-[#0F3D3A]/65`}>
                  For enquiries, further information and assistance with
                  our collections, feel free to get in touch.
                </p>

                {/* WHATSAPP */}
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className={`${BODY} mt-6 inline-flex items-center gap-3 border border-[#0F3D3A] bg-[#0F3D3A] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#F5DABF] transition-all duration-300 hover:bg-[#6C151E] hover:border-[#6C151E]`}
                >
                  <MessageCircle size={15} />
                  Contact via WhatsApp
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* CONTACT NOTE */}
              <div className="border-t border-[#0F3D3A]/20 py-7">
                <p className={`${HEADING} text-lg italic text-[#0F3D3A]/70`}>
                  We look forward to hearing from you.
                </p>
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
