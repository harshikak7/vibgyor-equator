
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { useProducts } from "../hooks/useProducts";
import { urlFor } from "../lib/imageUrl";

const categories = [
  { label: "Gems & Jewellery", value: "gems-jewellery", link: "/gems-jewellery" },
  { label: "Coins", value: "coins", link: "/rare-finds/coins" },
  // { label: "Banknotes", value: "banknotes", link: "/rare-finds/banknotes" },
  { label: "Stamps", value: "stamps", link: "/rare-finds/stamps" },
  { label: "Antiques", value: "antiques", link: "/antiques" },
];

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function CollectionSection() {
  const { products = [], loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState("gems-jewellery");

  const selectedCategory = categories.find(
    (category) => category.value === activeCategory
  );

  // Available products first; featured products appear at the beginning.
  // This prevents the homepage section from being empty just because
  // fewer than six products have been marked as featured in Sanity.
  const featuredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.category === activeCategory &&
          product.availability === "available"
      )
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }

        return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
      })
      .slice(0, 6);
  }, [products, activeCategory]);

  const handleEnquiry = (product) => {
    const phone = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");

    if (!phone) {
      alert("WhatsApp number is not configured.");
      return;
    }

    const message = `Hello Vibgyor Equator, I'm interested in ${product.name}. Could you please share more details?`;
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="collections"
      className="bg-[#F7F1E3] px-5 py-12 md:px-10 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* HEADING */}
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-7 md:mb-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-['Cinzel'] text-2xl font-semibold leading-tight text-[#0F3D3A] md:text-3xl lg:text-[38px]"
          >
            A Closer Look at Our Collections
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-2 max-w-lg font-['Plus_Jakarta_Sans'] text-xs leading-6 text-[#0F3D3A]/65 md:text-sm"
          >
            Discover distinctive pieces, each with a story worth keeping.
          </motion.p>
        </motion.div>

        {/* DESKTOP CATEGORY TABS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-7 hidden flex-wrap gap-2.5 md:flex"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                aria-pressed={isActive}
                className={`px-4 py-2.5 font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                  isActive
                    ? "bg-[#0F3D3A] text-[#F5DABF]"
                    : "border border-[#0F3D3A]/15 text-[#0F3D3A]/65 hover:border-[#6C151E] hover:text-[#6C151E]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* MOBILE CATEGORY DROPDOWN */}
        <div className="relative mb-6 md:hidden">
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            aria-label="Choose a collection"
            className="w-full appearance-none border border-[#0F3D3A]/25 bg-[#F9E8D7] px-4 py-3 pr-10 font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0F3D3A] outline-none focus:border-[#6C151E]"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0F3D3A]"
          />
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="w-[145px] shrink-0 animate-pulse sm:w-[175px] lg:w-[190px]"
              >
                <div className="aspect-square bg-[#0F3D3A]/10" />
                <div className="mt-3 h-3 w-3/4 bg-[#0F3D3A]/10" />
                <div className="mt-2 h-2 w-1/2 bg-[#0F3D3A]/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#6C151E]">
              We couldn't load the collection right now. Please try again shortly.
            </p>
          </div>
        ) : featuredProducts.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex items-start gap-3 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
          >
            {featuredProducts.map((product) => (
              <motion.article
                key={product._id || product.slug || product.name}
                variants={fadeUp}
                className="group w-[145px] shrink-0 sm:w-[175px] lg:w-[190px] xl:w-[200px]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#EAE4D8]">
                  {product.coverImage ? (
                    <img
                      src={urlFor(product.coverImage)
                        .width(700)
                        .auto("format")
                        .quality(85)
                        .fit("max")
                        .url()}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-3"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-['Plus_Jakarta_Sans'] text-xs text-[#0F3D3A]/40">
                      Vibgyor Equator
                    </div>
                  )}

                  {/* Enquiry button: visible on touch devices, hover on desktop */}
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleEnquiry(product)}
                      className="flex w-full items-center justify-between bg-[#F5DABF] px-2.5 py-3 font-['Plus_Jakarta_Sans'] text-[8px] font-semibold uppercase tracking-[0.1em] text-[#0F3D3A] transition-colors hover:bg-white sm:text-[9px]"
                    >
                      <span>Enquire Now</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="pt-2.5">
                  <h3 className="font-['Cinzel'] text-[11px] font-semibold leading-[1.5] text-[#0F3D3A] sm:text-xs">
                    {product.name}
                  </h3>

                  {product.country && (
                    <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[8px] uppercase tracking-[0.08em] text-[#0F3D3A]/50 sm:text-[9px]">
                      {product.country}
                    </p>
                  )}

                  {product.year && (
                    <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[9px] text-[#0F3D3A]/60">
                      {product.year}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}

            {/* VIEW MORE */}
            <motion.div
              variants={fadeUp}
              className="flex shrink-0 items-center self-stretch px-1"
            >
              <Link
                to={selectedCategory?.link || "/gems-jewellery"}
                className="group inline-flex items-center justify-center gap-2 border border-[#0F3D3A] px-4 py-3 font-['Plus_Jakarta_Sans'] text-[9px] font-semibold uppercase tracking-[0.1em] text-[#0F3D3A] transition-all duration-300 hover:bg-[#0F3D3A] hover:text-[#F5DABF]"
              >
                <span>View More</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key={`${activeCategory}-empty`}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex min-h-[180px] flex-col items-center justify-center px-5 text-center"
          >
            <h3 className="font-['Cinzel'] text-lg font-semibold text-[#0F3D3A]">
              Something special is on its way.
            </h3>

            <p className="mt-2 max-w-sm font-['Plus_Jakarta_Sans'] text-xs leading-6 text-[#0F3D3A]/60">
              We're currently curating pieces for this collection. Please check
              back soon.
            </p>

            <Link
              to={selectedCategory?.link || "/gems-jewellery"}
              className="mt-4 inline-flex items-center gap-2 border border-[#0F3D3A] px-4 py-3 font-['Plus_Jakarta_Sans'] text-[9px] font-semibold uppercase tracking-widest text-[#0F3D3A] transition-colors hover:bg-[#0F3D3A] hover:text-[#F5DABF]"
            >
              View More
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        )}

        {!loading && featuredProducts.length > 2 && (
          <p className="mt-3 text-right font-['Plus_Jakarta_Sans'] text-[8px] font-medium uppercase tracking-[0.15em] text-[#0F3D3A]/40">
            Scroll to explore <span aria-hidden="true">→</span>
          </p>
        )}
      </div>
    </section>
  );
}
