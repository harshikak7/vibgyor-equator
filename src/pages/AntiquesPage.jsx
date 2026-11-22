
import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { urlFor } from "../lib/imageUrl";
import ClosingCta from "../components/ClosingCta";
import Footer from "../components/Footer";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const HEADING = "font-['Cinzel']";
const BODY = "font-['Plus_Jakarta_Sans']";

function sortProducts(items) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
  });
}

function getImage(product, width = 800) {
  if (!product?.coverImage) return "";

  return urlFor(product.coverImage)
    .width(width)
    .auto("format")
    .quality(85)
    .url();
}

function ProductCard({ product, onEnquire }) {
  return (
    <article className="group w-[220px] shrink-0 sm:w-[250px]">
      {/* PRODUCT IMAGE + HOVER ENQUIRY */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4D8]">
        {product.coverImage ? (
          <img
            src={getImage(product)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className={`${BODY} flex h-full items-center justify-center text-xs text-[#0F3D3A]/40`}>
            Vibgyor Equator
          </div>
        )}

        {/* HOVER OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[#0F3D3A]/75 to-transparent p-4 pt-10 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEnquire(product)}
            className={`${BODY} inline-flex items-center gap-2 border border-white bg-[#F7F1E3] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0F3D3A] transition-colors duration-300 hover:bg-[#0F3D3A] hover:text-[#F5DABF]`}
          >
            Enquire Now <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="pt-3">
        <h3 className={`${HEADING} text-xs font-semibold leading-6 text-[#0F3D3A]`}>
          {product.name}
        </h3>
      </div>
    </article>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${BODY} whitespace-nowrap border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] transition-all ${
        active
          ? "border-[#0F3D3A] bg-[#0F3D3A] text-[#F5DABF]"
          : "border-[#0F3D3A]/20 text-[#0F3D3A]/65 hover:border-[#6C151E] hover:text-[#6C151E]"
      }`}
    >
      {children}
    </button>
  );
}

function CollectionRow({ products, onEnquire, loading }) {
  if (loading) {
    return (
      <p className={`${BODY} py-8 text-xs text-[#0F3D3A]/60`}>
        Loading collection...
      </p>
    );
  }

  if (!products.length) {
    return (
      <p className={`${BODY} py-8 text-xs text-[#0F3D3A]/60`}>
        New pieces in this collection will be added soon.
      </p>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-5 snap-x snap-mandatory [scrollbar-width:thin]">
      {products.map((product) => (
        <div key={product._id || product.name} className="snap-start">
          <ProductCard product={product} onEnquire={onEnquire} />
        </div>
      ))}
    </div>
  );
}

export default function AntiquesPage() {
  const { products = [], loading, error } = useProducts();

  const [paintingFilter, setPaintingFilter] = useState("all");

  const antiqueProducts = useMemo(
    () =>
      sortProducts(
        products.filter(
          (product) =>
            product.category === "antiques" &&
            product.availability === "available"
        )
      ),
    [products]
  );

  const paintings = useMemo(
    () =>
      antiqueProducts.filter(
        (product) => product.antiqueType === "painting"
      ),
    [antiqueProducts]
  );

  const handicrafts = useMemo(
    () =>
      antiqueProducts.filter(
        (product) => product.antiqueType === "handicrafts"
      ),
    [antiqueProducts]
  );

  const filteredPaintings = useMemo(() => {
    if (paintingFilter === "all") return paintings;

    return paintings.filter(
      (product) => product.paintingType === paintingFilter
    );
  }, [paintings, paintingFilter]);

  const heroImages = antiqueProducts
    .filter((product) => product.coverImage)
    .slice(0, 3);

  const handleEnquiry = (product) => {
    const phone = (WHATSAPP_NUMBER || "").replace(/\D/g, "");

    if (!phone) {
      alert("WhatsApp number is not configured.");
      return;
    }

    const message = `Hello Vibgyor Equator, I'm interested in ${product.name}. Could you please share more details?`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F1E3]">

      {/* HERO */}
      <section className="relative overflow-hidden px-[6%] py-5 md:py-8">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid items-center gap-5 md:grid-cols-[1fr_1fr] md:gap-10">

            {/* HERO TEXT */}
            <div className="relative z-10">
              <p className={`${BODY} mb-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6C151E]`}>
                A collection of timeless finds
              </p>

              <h1 className={`${HEADING} max-w-[600px] text-[clamp(2.7rem,6vw,5.6rem)] font-medium leading-[1.12] text-[#0F3D3A]`}>
                Stories told
                <br />
                through <span className="italic text-[#6C151E]">art.</span>
              </h1>

              <p className={`${BODY} mt-6 max-w-[390px] text-[11px] leading-7 text-[#0F3D3A]/65`}>
                Discover paintings and handcrafted pieces that celebrate
                creativity, tradition and the beauty of detail.
              </p>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("paintings")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className={`${BODY} mt-8 inline-flex items-center gap-3 bg-[#0F3D3A] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#F5DABF] transition-colors hover:bg-[#6C151E]`}
              >
                Explore collections <ArrowDown size={14} />
              </button>
            </div>

            {/* HERO IMAGE COLLAGE */}
            <div className="relative mx-auto h-[320px] w-full max-w-[490px] sm:h-[390px]">
              <div className="absolute left-[5%] top-[12%] w-[42%] rotate-[-8deg] bg-white p-2 pb-8 shadow-xl">
                {heroImages[0] ? (
                  <img
                    src={getImage(heroImages[0], 600)}
                    alt={heroImages[0].name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-[#EAE4D8]" />
                )}
              </div>

              <div className="absolute right-[4%] top-[4%] w-[43%] rotate-[7deg] bg-white p-2 pb-8 shadow-xl">
                {heroImages[1] ? (
                  <img
                    src={getImage(heroImages[1], 600)}
                    alt={heroImages[1].name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-[#EAE4D8]" />
                )}
              </div>

              <div className="absolute bottom-[4%] left-[28%] w-[44%] rotate-[-3deg] bg-white p-2 pb-8 shadow-xl">
                {heroImages[2] ? (
                  <img
                    src={getImage(heroImages[2], 600)}
                    alt={heroImages[2].name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-[#EAE4D8]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAINTINGS */}
      <section
        id="paintings"
        className="scroll-mt-24 px-[6%] py-8 md:py-10"
      >
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-6">
            <p className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}>
              The art collection / 01
            </p>

            <h2 className={`${HEADING} text-2xl font-semibold text-[#0F3D3A] md:text-3xl`}>
              Paintings
            </h2>

            <p className={`${BODY} mt-2 max-w-lg text-[11px] leading-6 text-[#0F3D3A]/65`}>
              Explore distinctive works of art, from gemstone creations
              to paintings on cloth.
            </p>
          </div>

          {/* PAINTING FILTERS */}
          <div className="mb-7 flex flex-wrap gap-2">
            <FilterButton
              active={paintingFilter === "all"}
              onClick={() => setPaintingFilter("all")}
            >
              All paintings
            </FilterButton>

            <FilterButton
              active={paintingFilter === "gemstone-painting"}
              onClick={() => setPaintingFilter("gemstone-painting")}
            >
              Gemstone paintings
            </FilterButton>

            <FilterButton
              active={paintingFilter === "cloth-painting"}
              onClick={() => setPaintingFilter("cloth-painting")}
            >
              Cloth paintings
            </FilterButton>
          </div>

          {error ? (
            <p className={`${BODY} py-8 text-xs text-[#6C151E]`}>
              We couldn't load the antique collection. Please check your
              Sanity connection and product data.
            </p>
          ) : (
            <CollectionRow
              products={filteredPaintings}
              onEnquire={handleEnquiry}
              loading={loading}
            />
          )}
        </div>
      </section>

      {/* HANDICRAFTS */}
      <section
        id="handicrafts"
        className="scroll-mt-24 bg-[#F1E8D9] px-[6%] py-8 md:py-10"
      >
        <div className="mx-auto max-w-[1300px]">
          <p className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}>
            The craft collection / 02
          </p>

          <h2 className={`${HEADING} text-2xl font-semibold text-[#0F3D3A] md:text-3xl`}>
            Handicrafts
          </h2>

          <p className={`${BODY} mb-7 mt-2 max-w-lg text-[11px] leading-6 text-[#0F3D3A]/65`}>
            Discover handcrafted objects that bring together traditional
            artistry and individual character.
          </p>

          {error ? (
            <p className={`${BODY} py-8 text-xs text-[#6C151E]`}>
              We couldn't load the antique collection. Please check your
              Sanity connection and product data.
            </p>
          ) : (
            <CollectionRow
              products={handicrafts}
              onEnquire={handleEnquiry}
              loading={loading}
            />
          )}
        </div>
      </section>

      <ClosingCta />
      <Footer />
    </main>
  );
}
