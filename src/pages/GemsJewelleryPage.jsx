
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Plus } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { urlFor } from "../lib/imageUrl";
import ClosingCta from "../components/ClosingCta";
import Footer from "../components/Footer";
import jewelleryHero from "../assets/hero img2.jpeg";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const CATEGORY = "gems-jewellery";

const HEADING = "font-['Cinzel']";
const BODY = "font-['Plus_Jakarta_Sans']";

const motionCss = `
html:has(#jewellery-catalogue) {
  scroll-behavior: smooth;
}

@keyframes jewellery-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

.jewellery-rise {
  animation: jewellery-rise .7s ease both;
}

.jewellery-types {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transform: translateY(-8px);
  transition: grid-template-rows .4s ease, opacity .3s ease, transform .4s ease;
}

.jewellery-types.expanded {
  grid-template-rows: 1fr;
  opacity: 1;
  transform: translateY(0);
}

.jewellery-types-inner {
  min-height: 0;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .jewellery-types { transition: none; }
  .jewellery-rise { animation: none; }
}
`;

function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hiddenPosition =
    direction === "left"
      ? "-translate-x-20"
      : direction === "right"
        ? "translate-x-20"
        : "translate-y-6";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${hiddenPosition} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}

function formatType(type) {
  if (!type || type === "All") return type;

  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function sortProducts(items) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
  });
}

export default function GemsJewelleryPage() {
  const { products = [], loading } = useProducts();

  const [activeType, setActiveType] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showAllTypes, setShowAllTypes] = useState(false);

  const jewelleryProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category === CATEGORY &&
          product.availability === "available"
      ),
    [products]
  );

  const jewelleryTypes = useMemo(() => {
    const types = jewelleryProducts
      .map((product) => product.jewelleryType)
      .filter(Boolean);

    return ["All", ...new Set(types)];
  }, [jewelleryProducts]);

  const heroProduct = useMemo(
    () => sortProducts(jewelleryProducts)[0],
    [jewelleryProducts]
  );

  const spotlight = useMemo(
    () =>
      sortProducts(
        jewelleryProducts.filter((product) => product !== heroProduct)
      ).slice(0, 2),
    [jewelleryProducts, heroProduct]
  );

  const featuredProducts = useMemo(
    () =>
      sortProducts(
        jewelleryProducts.filter((product) => product.featured === true)
      ),
    [jewelleryProducts]
  );

  const displayedProducts = useMemo(() => {
    let result = [...jewelleryProducts];

    if (activeType !== "All") {
      result = result.filter(
        (product) => product.jewelleryType === activeType
      );
    }

    if (sortBy === "featured") result = sortProducts(result);

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "order") {
      result.sort(
        (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
      );
    }

    return result;
  }, [jewelleryProducts, activeType, sortBy]);

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

  const initiallyVisibleTypes = jewelleryTypes.slice(0, 4);
  const additionalTypes = jewelleryTypes.slice(4);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F1E3]">
      <style>{motionCss}</style>

      {/* HERO */}
      <section className="relative flex min-h-[480px] flex-col overflow-hidden bg-[#0F3D3A] md:min-h-[600px]">
        {/* Local asset image - no Sanity hero image */}
        <img
          src={jewelleryHero}
          alt="Vibgyor Equator fine jewellery collection"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D3A]/90 via-[#0F3D3A]/55 to-[#0F3D3A]/5" />

        <div className="relative z-10 flex flex-1 items-center px-[7%] py-16">
          <div className="max-w-[620px] text-left">
            <p
              className={`${BODY} jewellery-rise mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5DABF]`}
            >
              A collection to treasure
            </p>

            <h1
              className={`${HEADING} jewellery-rise text-[clamp(2.8rem,6.5vw,6rem)] font-semibold leading-[1.12] text-white`}
            >
              Beauty in every
              <br />
              <span className="italic text-[#F5DABF]">detail.</span>
            </h1>

            <a
              href="#jewellery-catalogue"
              className={`${BODY} jewellery-rise mt-7 inline-flex items-center gap-3 border border-white/75 px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#F5DABF] hover:bg-[#F5DABF] hover:text-[#0F3D3A]`}
            >
              Explore collection
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* EDITORIAL SECTION */}
      <section className="px-[5%] py-10 md:py-14">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-x-3 gap-y-5 md:grid-cols-[1fr_0.9fr_1fr] md:gap-8">
          {spotlight[0] && (
            <Reveal className="order-1" direction="left">
              <TiltCard product={spotlight[0]} side="left" />
            </Reveal>
          )}

          <Reveal className="order-3 col-span-2 px-2 py-2 text-center md:order-2 md:col-span-1">
            <h2
              className={`${HEADING} text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-[1.3] text-[#0F3D3A]`}
            >
              Jewellery made
              <br />
              to be treasured.
            </h2>

            <p
              className={`${BODY} mx-auto mt-3 max-w-[260px] text-[11px] leading-6 text-[#0F3D3A]/70`}
            >
              Thoughtfully chosen pieces, each with a character of its own.
            </p>
          </Reveal>

          {spotlight[1] && (
            <Reveal className="order-2 md:order-3" direction="right" delay={150}>
              <TiltCard product={spotlight[1]} side="right" />
            </Reveal>
          )}
        </div>
      </section>

      {/* SELECTED PIECES */}
      <section className="bg-[#F1E8D9] px-[5%] py-10 md:py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p
                className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6C151E]`}
              >
                A closer look
              </p>

              <h2
                className={`${HEADING} text-2xl font-semibold text-[#0F3D3A] md:text-3xl`}
              >
                Selected pieces
              </h2>
            </div>

            <a
              href="#jewellery-catalogue"
              className={`${BODY} inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#6C151E]`}
            >
              View all <ArrowUpRight size={14} />
            </a>
          </div>

          {loading ? (
            <ProductSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-5">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.name}
                  product={product}
                  onEnquire={handleEnquiry}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COMPLETE COLLECTION */}
      <section
        id="jewellery-catalogue"
        className="scroll-mt-24 px-[5%] py-10 md:py-14"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-6 text-center">
            <p
              className={`${BODY} mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]`}
            >
              Find your piece
            </p>

            <h2
              className={`${HEADING} text-3xl font-semibold text-[#0F3D3A] md:text-4xl`}
            >
              The collection
            </h2>
          </Reveal>

          {/* CATEGORY FILTERS */}
          <div className="mb-6 border-y border-[#0F3D3A]/15 py-4">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {initiallyVisibleTypes.map((type) => (
                <TypeButton
                  key={type}
                  type={type}
                  active={activeType === type}
                  onClick={() => setActiveType(type)}
                />
              ))}

              {additionalTypes.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllTypes((current) => !current)}
                  aria-expanded={showAllTypes}
                  aria-label={
                    showAllTypes ? "Show fewer types" : "Show more types"
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#6C151E]/50 text-[#6C151E] transition-all duration-300 hover:bg-[#6C151E] hover:text-[#F5DABF]"
                >
                  <Plus
                    size={16}
                    className={`transition-transform duration-300 ${
                      showAllTypes ? "rotate-45" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            <div
              className={`jewellery-types ${
                showAllTypes ? "expanded" : ""
              }`}
            >
              <div className="jewellery-types-inner">
                <div className="flex flex-wrap justify-center gap-2.5 pt-3">
                  {additionalTypes.map((type) => (
                    <TypeButton
                      key={type}
                      type={type}
                      active={activeType === type}
                      onClick={() => setActiveType(type)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COUNT AND SORT */}
          <div className="mb-5 flex items-center justify-between">
            <p
              className={`${BODY} text-[9px] font-medium uppercase tracking-[0.12em] text-[#0F3D3A]/60`}
            >
              {displayedProducts.length} pieces
            </p>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort jewellery"
                className={`${BODY} appearance-none border border-[#0F3D3A]/20 bg-transparent py-2 pl-3 pr-8 text-[10px] text-[#0F3D3A] outline-none`}
              >
                <option value="featured">Featured</option>
                <option value="order">Collection order</option>
                <option value="name">Name: A to Z</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#0F3D3A]"
              />
            </div>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <ProductSkeleton count={8} />
          ) : displayedProducts.length > 0 ? (
            <div
              key={`${activeType}-${sortBy}`}
              className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-x-6"
            >
              {displayedProducts.map((product, index) => (
                <Reveal
                  key={product._id || product.name}
                  delay={(index % 3) * 70}
                >
                  <ProductCard
                    product={product}
                    onEnquire={handleEnquiry}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <h3
                className={`${HEADING} text-xl font-semibold text-[#0F3D3A]`}
              >
                No pieces available
              </h3>

              <p
                className={`${BODY} mt-2 text-xs text-[#0F3D3A]/60`}
              >
                There are no available products in this type right now.
              </p>

              {activeType !== "All" && (
                <button
                  onClick={() => setActiveType("All")}
                  className={`${BODY} mt-4 border-b border-[#6C151E] pb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6C151E]`}
                >
                  View all jewellery
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <ClosingCta />
      <Footer />
    </main>
  );
}

function TypeButton({ type, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${BODY} border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
        active
          ? "border-[#0F3D3A] bg-[#0F3D3A] text-[#F5DABF]"
          : "border-[#0F3D3A]/20 text-[#0F3D3A]/70 hover:border-[#6C151E] hover:text-[#6C151E]"
      }`}
    >
      {formatType(type)}
    </button>
  );
}

function TiltCard({ product, side }) {
  const left = side === "left";

  return (
    <div
      className={`mx-auto w-[90%] max-w-[300px] transition-transform duration-500 hover:rotate-0 ${
        left ? "-rotate-[5deg]" : "rotate-[5deg]"
      }`}
    >
      <div className="bg-[#F1E8D9] p-2.5 pb-4 shadow-[0_18px_35px_-22px_rgba(15,61,58,0.45)]">
        <div className="aspect-[3/4] overflow-hidden bg-[#EAE4D8]">
          {product.coverImage && (
            <img
              src={urlFor(product.coverImage)
                .width(800)
                .auto("format")
                .quality(85)
                .fit("max")
                .url()}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain p-4 transition-transform duration-700 hover:scale-105"
            />
          )}
        </div>

        <p
          className={`${HEADING} mt-3 truncate px-1 text-xs font-semibold text-[#0F3D3A]`}
        >
          {product.name}
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product, onEnquire }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-square overflow-hidden bg-[#EAE4D8]">
        {product.coverImage ? (
          <img
            src={urlFor(product.coverImage)
              .width(900)
              .auto("format")
              .quality(85)
              .fit("max")
              .url()}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-7"
          />
        ) : (
          <div
            className={`${BODY} flex h-full items-center justify-center text-xs text-[#0F3D3A]/40`}
          >
            Vibgyor Equator
          </div>
        )}
      </div>

      <div className="pt-3">
        <h3
          className={`${HEADING} text-[10px] font-semibold leading-[1.6] text-[#0F3D3A] sm:text-xs`}
        >
          {product.name}
        </h3>

        <p
          className={`${BODY} mt-1 text-[8px] uppercase tracking-[0.1em] text-[#6C151E]/75 sm:text-[9px]`}
        >
          {formatType(product.jewelleryType) || "Fine Jewellery"}
        </p>

        <button
          type="button"
          onClick={() => onEnquire(product)}
          className={`${BODY} mt-3 inline-flex items-center gap-2 border border-[#0F3D3A] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#0F3D3A] transition-colors duration-300 hover:bg-[#0F3D3A] hover:text-[#F5DABF] sm:px-4 sm:text-[9px]`}
        >
          Enquire Now <ArrowUpRight size={13} />
        </button>
      </div>
    </article>
  );
}

function ProductSkeleton({ count }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-square bg-[#0F3D3A]/10" />
          <div className="mt-3 h-3 w-3/4 bg-[#0F3D3A]/10" />
          <div className="mt-2 h-2 w-1/2 bg-[#0F3D3A]/10" />
        </div>
      ))}
    </div>
  );
}
