
import React, { useMemo } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { urlFor } from "../lib/imageUrl";
import ClosingCta from "../components/ClosingCta";
import Footer from "../components/Footer";

const HEADING = "font-['Cinzel']";
const BODY = "font-['Plus_Jakarta_Sans']";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

function openWhatsApp(message) {
  const phone = (WHATSAPP_NUMBER || "").replace(/\D/g, "");

  if (!phone) {
    alert("WhatsApp number is not configured.");
    return;
  }

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

function getImage(product, width = 800) {
  if (!product?.coverImage) return "";

  return urlFor(product.coverImage)
    .width(width)
    .auto("format")
    .quality(85)
    .url();
}

function sortProducts(items) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
  });
}

function StampFrame({ product, className = "" }) {
  return (
    <div
      className={`relative isolate bg-[#F7F1E3] p-[9px] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, #F1E8D9 3.5px, transparent 4px)",
        backgroundSize: "15px 8px",
        backgroundPosition: "top left",
        backgroundRepeat: "repeat-x",
      }}
    >
      <img
        src={getImage(product, 700)}
        alt={product.name}
        loading="lazy"
        className="block h-full w-full object-contain"
      />
    </div>
  );
}

function StampCard({ product }) {
  return (
    <article className="group w-[190px] shrink-0 snap-start sm:w-[230px]">
      <div className="aspect-[4/5] bg-[#EAE4D8] p-3">
        <img
          src={getImage(product)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <h3
        className={`${HEADING} mt-3 text-xs font-medium leading-6 text-[#0F3D3A] sm:text-sm`}
      >
        {product.name}
      </h3>

      <button
        type="button"
        onClick={() =>
          openWhatsApp(
            `Hello Vibgyor Equator, I'm interested in the stamp "${product.name}". Could you please share more details?`
          )
        }
        className={`${BODY} mt-3 inline-flex items-center gap-2 border border-[#0F3D3A] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#0F3D3A] transition-colors duration-300 hover:bg-[#0F3D3A] hover:text-[#F5DABF] sm:px-4 sm:text-[10px]`}
      >
        Enquire Now
        <ArrowUpRight size={14} />
      </button>
    </article>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="w-[190px] shrink-0 animate-pulse sm:w-[230px]"
        >
          <div className="aspect-[4/5] bg-[#0F3D3A]/10" />
          <div className="mt-4 h-3 w-3/4 bg-[#0F3D3A]/10" />
          <div className="mt-3 h-8 w-28 bg-[#0F3D3A]/10" />
        </div>
      ))}
    </div>
  );
}

export default function StampsPage() {
  const { products = [], loading, error } = useProducts();

  const stamps = useMemo(
    () =>
      sortProducts(
        products.filter(
          (product) =>
            product.category === "stamps" &&
            product.availability === "available"
        )
      ),
    [products]
  );

  const heroStamps = stamps.slice(0, 5);
  const historyStamps = stamps.slice(0, 2);

  const scrollToCollection = () => {
    document.getElementById("stamp-collection")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F1E3]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0F3D3A] px-[5%] py-9 text-[#F7F1E3] md:py-12">
        <div className="mx-auto max-w-[1300px]">
          {/* HEADER */}
          <div className="mb-7 flex items-center justify-between border-b border-white/15 pb-3">
            <p
              className={`${BODY} text-[9px] uppercase tracking-[0.2em] text-white/70`}
            >
              Vibgyor Equator / Philately
            </p>

            <p
              className={`${BODY} hidden text-[9px] uppercase tracking-[0.16em] text-white/50 sm:block`}
            >
              The stamp collection
            </p>
          </div>

          {/* HERO CONTENT */}
          <div className="grid items-center gap-7 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
            {/* TEXT */}
            <div className="order-2 md:order-1">
              <p
                className={`${BODY} mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F5DABF]`}
              >
                Small pieces. Remarkable stories.
              </p>

              <h1
                className={`${HEADING} text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.12]`}
              >
                Postage
                <br />
                <span className="italic text-[#F5DABF]">stamps.</span>
              </h1>

              <p
                className={`${BODY} mt-4 max-w-md text-[11px] leading-7 text-white/70`}
              >
                Miniature expressions of history, culture and art.
                Explore stamps that have travelled across the world,
                carrying stories far beyond their borders.
              </p>

              <button
                type="button"
                onClick={scrollToCollection}
                className={`${BODY} mt-6 inline-flex items-center gap-3 border border-[#F5DABF]/70 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#F5DABF] transition-all duration-300 hover:bg-[#F5DABF] hover:text-[#0F3D3A]`}
              >
                Explore collection
                <ArrowDown size={14} />
              </button>
            </div>

            {/* STAMP COLLAGE */}
            <div className="order-1 mx-auto flex h-[270px] w-full max-w-[470px] items-center justify-center sm:h-[340px] md:order-2">
              <div className="relative h-full w-full">
                {heroStamps[0] && (
                  <div className="absolute left-[4%] top-[6%] w-[27%] rotate-[-9deg] shadow-xl">
                    <StampFrame product={heroStamps[0]} />
                  </div>
                )}

                {heroStamps[1] && (
                  <div className="absolute right-[6%] top-[10%] w-[27%] rotate-[8deg] shadow-xl">
                    <StampFrame product={heroStamps[1]} />
                  </div>
                )}

                {heroStamps[2] && (
                  <div className="absolute left-[35%] top-[22%] z-10 w-[34%] rotate-[-2deg] shadow-2xl">
                    <StampFrame product={heroStamps[2]} />
                  </div>
                )}

                {heroStamps[3] && (
                  <div className="absolute bottom-[6%] left-[10%] w-[27%] rotate-[7deg] shadow-xl">
                    <StampFrame product={heroStamps[3]} />
                  </div>
                )}

                {heroStamps[4] && (
                  <div className="absolute bottom-[4%] right-[8%] w-[27%] rotate-[-8deg] shadow-xl">
                    <StampFrame product={heroStamps[4]} />
                  </div>
                )}

                <p
                  className={`${HEADING} absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-base italic text-[#F5DABF] sm:text-xl`}
                >
                  Every stamp
                </p>

                <p
                  className={`${HEADING} absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-base italic text-[#F5DABF] sm:text-xl`}
                >
                  tells a story
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-[#F1E8D9] px-[6%] py-9 md:py-12">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          {/* HISTORY TEXT */}
          <div>
            <p
              className={`${BODY} mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}
            >
              A little history
            </p>

            <h2
              className={`${HEADING} text-[clamp(2.3rem,4.5vw,4.3rem)] font-medium leading-[1.15] text-[#0F3D3A]`}
            >
              History
              <br />
              <span className="italic text-[#6C151E]">of stamps.</span>
            </h2>

            <p
              className={`${BODY} mt-4 max-w-md text-[11px] leading-7 text-[#0F3D3A]/70`}
            >
              Introduced in 1840, the Penny Black transformed
              postal communication by making prepaid postage
              possible. What began as a practical innovation
              soon became a canvas for art, culture and history.
            </p>

            <p
              className={`${BODY} mt-3 max-w-md text-[11px] leading-7 text-[#0F3D3A]/70`}
            >
              Across generations and borders, stamps have
              preserved moments, celebrated people and
              captured the identity of nations in miniature.
            </p>
          </div>

          {/* TWO STAMP IMAGES */}
          <div className="mx-auto flex w-full max-w-[430px] items-center justify-center gap-5 sm:gap-8">
            {historyStamps.map((product, index) => (
              <div
                key={product._id || product.name}
                className={`w-[43%] ${
                  index === 0
                    ? "rotate-[-6deg]"
                    : "translate-y-5 rotate-[6deg]"
                }`}
              >
                <StampFrame product={product} className="shadow-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="stamp-collection"
        className="scroll-mt-24 bg-[#F7F1E3] px-[6%] py-10 md:py-14"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* COLLECTION HEADER */}
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p
                className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}
              >
                Explore
              </p>

              <h2
                className={`${HEADING} text-2xl font-semibold text-[#0F3D3A] md:text-4xl`}
              >
                The collection
              </h2>
            </div>

            {!loading && stamps.length > 0 && (
              <p
                className={`${BODY} text-[9px] uppercase tracking-[0.12em] text-[#0F3D3A]/55`}
              >
                {stamps.length} pieces
              </p>
            )}
          </div>

          {/* PRODUCTS */}
          {error ? (
            <p className={`${BODY} py-10 text-xs text-[#6C151E]`}>
              We couldn't load the stamp collection. Please check your
              Sanity connection and product data.
            </p>
          ) : loading ? (
            <ProductSkeleton />
          ) : stamps.length > 0 ? (
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6">
              {stamps.map((product) => (
                <StampCard
                  key={product._id || product.name}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className={`${HEADING} text-xl text-[#0F3D3A]`}>
                New pieces coming soon
              </h3>

              <p className={`${BODY} mt-3 text-xs text-[#0F3D3A]/60`}>
                Our stamp collection will be updated soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <ClosingCta />
      <Footer />
    </main>
  );
}
