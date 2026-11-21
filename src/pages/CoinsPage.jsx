
import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { useProducts } from "../hooks/useProducts";
import { urlFor } from "../lib/imageUrl";

const INDIA_CATALOGUE_URL = import.meta.env.VITE_INDIA_CATALOGUE_URL;
const COUNTRIES_CATALOGUE_URL =
  import.meta.env.VITE_COUNTRIES_CATALOGUE_URL;

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function openCatalogue(url) {
  if (!url) {
    alert("Catalogue link is not configured yet.");
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export default function CoinsPage() {
  const { products = [], loading, error } = useProducts();

  // Fetch coin products with a country name.
  const coinProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === "coins" &&
        typeof product.country === "string" &&
        product.country.trim() !== ""
    );
  }, [products]);

  // Group products by country.
  const countries = useMemo(() => {
    const groupedCountries = new Map();

    coinProducts.forEach((product) => {
      const countryName = product.country.trim();
      const countryKey = countryName.toLowerCase();

      if (!groupedCountries.has(countryKey)) {
        groupedCountries.set(countryKey, {
          name: countryName,
          products: [],
        });
      }

      groupedCountries.get(countryKey).products.push(product);
    });

    return Array.from(groupedCountries.values())
      .map((country) => {
        const sortedProducts = [...country.products].sort((a, b) => {
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1;
          }

          return (
            (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
          );
        });

        const imageProduct =
          sortedProducts.find((product) => product.coverImage) ||
          sortedProducts[0];

        const yearProduct = sortedProducts.find(
          (product) => product.year
        );

        return {
  name: country.name,
  image: imageProduct?.coverImage,
  productName: imageProduct?.name || "",
  year: yearProduct?.year || "",
};
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [coinProducts]);

  const india = useMemo(
    () =>
      countries.find(
        (country) => country.name.toLowerCase() === "india"
      ),
    [countries]
  );

  const otherCountries = useMemo(
    () =>
      countries.filter(
        (country) => country.name.toLowerCase() !== "india"
      ),
    [countries]
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F1E3] px-5 py-16">
        <div className="mx-auto max-w-[1400px] animate-pulse">
          <div className="h-[360px] bg-[#0F3D3A]/10 md:h-[440px]" />
          <div className="mt-12 h-8 w-64 bg-[#0F3D3A]/10" />
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/4.5] bg-[#0F3D3A]/10"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F1E3] px-5 text-center">
        <div>
          <h2 className="font-['Cinzel'] text-2xl font-semibold text-[#0F3D3A]">
            Unable to load coin collections
          </h2>
          <p className="mt-3 font-['Plus_Jakarta_Sans'] text-sm text-[#0F3D3A]/65">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F7F1E3] pb-16">

      {/* INDIA FEATURE SECTION */}
      {india && (
        <section className="px-4 pt-5 md:px-8 md:pt-7">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative mx-auto flex min-h-[340px] max-w-[1500px] items-center overflow-hidden bg-[#0F3D3A] sm:min-h-[390px] md:min-h-[440px]"
          >
            {india.image && (
              <img
                src={urlFor(india.image)
                  .width(2000)
                  .auto("format")
                  .quality(90)
                  .url()}
                alt="India coin collection"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            )}

            {/* Softer image overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D3A]/90 via-[#0F3D3A]/55 to-[#0F3D3A]/15" />

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-start px-6 py-12 sm:px-10 md:px-14 lg:px-16">
              <p className="mb-3 font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5DABF] md:text-xs">
                The Indian Collection
              </p>

              <h1 className="font-['Cinzel'] text-4xl font-bold leading-[1.15] text-[#F5DABF] sm:text-5xl md:text-6xl">
                India
              </h1>

              <p className="mt-3 max-w-lg font-['Plus_Jakarta_Sans'] text-xs leading-6 text-white/85 sm:text-sm md:text-base">
                Explore a collection celebrating India's rich
                numismatic heritage, history and craftsmanship.
              </p>

              <button
                type="button"
                onClick={() => openCatalogue(INDIA_CATALOGUE_URL)}
                className="group mt-6 inline-flex items-center gap-5 bg-[#F5DABF] px-6 py-3.5 font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F3D3A] transition-colors duration-300 hover:bg-white md:mt-7 md:px-7 md:py-4"
              >
                View India Catalogue
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>

            {/* Collection label */}
            <div className="absolute bottom-5 right-6 hidden text-right sm:block md:bottom-7 md:right-9">
              <p className="font-['Plus_Jakarta_Sans'] text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65">
                VIBGYOR EQUATOR
              </p>
              <p className="mt-1 font-['Cinzel'] text-sm text-[#F5DABF]">
                India Collection
              </p>
            </div>
          </motion.div>
        </section>
      )}

      {/* OTHER COUNTRIES */}
      <section className="mx-auto max-w-[1500px] px-5 pt-12 md:px-10 md:pt-16">

        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-[#0F3D3A]/15 pb-5 md:mb-9 md:flex-row md:items-end">
          <div>
            <p className="mb-2 font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#6C151E] md:text-xs">
              Beyond India
            </p>

            <h2 className="font-['Cinzel'] text-3xl font-bold leading-tight text-[#0F3D3A] sm:text-4xl md:text-5xl">
              Explore by Country
            </h2>
          </div>

          <p className="max-w-md font-['Plus_Jakarta_Sans'] text-xs leading-6 text-[#0F3D3A]/70 md:text-sm">
            Discover coins from around the world, each reflecting
            a unique history, culture and heritage.
          </p>
        </div>

        {otherCountries.length > 0 ? (
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10"
          >
            {otherCountries.map((country) => (
              <motion.a
                key={country.name}
                href={COUNTRIES_CATALOGUE_URL || undefined}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                onClick={(event) => {
                  if (!COUNTRIES_CATALOGUE_URL) {
                    event.preventDefault();
                    alert("The country catalogue link is not configured yet.");
                  }
                }}
                aria-label={`View ${country.name} coin catalogue`}
                className="group block"
              >
                {/* Country image */}
                <div className="relative aspect-[4/4.5] overflow-hidden bg-[#EDE6D8]">
                  {country.image ? (
                    <img
                      src={urlFor(country.image)
                        .width(900)
                        .auto("format")
                        .quality(88)
                        .url()}
                      alt={`${country.name} coin collection`}
                      loading="lazy"
                      className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:p-3"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-['Plus_Jakarta_Sans'] text-xs text-[#0F3D3A]/45">
                      Image coming soon
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#0F3D3A]/75 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                    <span className="font-['Plus_Jakarta_Sans'] text-[9px] font-bold uppercase tracking-[0.15em] text-white sm:text-[10px]">
                      View Catalogue
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5DABF] text-[#0F3D3A] sm:h-9 sm:w-9">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Country title and year */}
                <div className="flex items-start justify-between gap-2 border-b border-[#0F3D3A]/20 pb-3 pt-3 sm:pt-4">
                  <div>
                    <h3 className="font-['Cinzel'] text-sm font-bold leading-snug text-[#0F3D3A] transition-colors duration-300 group-hover:text-[#6C151E] sm:text-base md:text-lg">
                      {country.name}
                    </h3>

                    {country.productName && (
  <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[10px] font-medium text-[#0F3D3A]/60 sm:text-xs">
    {country.productName}
  </p>
)}
                  </div>

                  {country.year && (
                    <span className="shrink-0 pt-1 font-['Plus_Jakarta_Sans'] text-[9px] font-semibold tracking-[0.08em] text-[#0F3D3A]/65 sm:text-[10px]">
                      {country.year}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="font-['Cinzel'] text-xl font-semibold text-[#0F3D3A]">
              New collections are coming soon
            </h3>

            <p className="mx-auto mt-3 max-w-md font-['Plus_Jakarta_Sans'] text-sm leading-6 text-[#0F3D3A]/65">
              We are currently adding more countries to our
              coin catalogue. Please check back soon.
            </p>

            <button
              type="button"
              onClick={() => openCatalogue(COUNTRIES_CATALOGUE_URL)}
              className="mt-5 inline-flex items-center gap-3 border border-[#0F3D3A] px-6 py-3 font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-widest text-[#0F3D3A] transition-colors hover:bg-[#0F3D3A] hover:text-[#F5DABF]"
            >
              Explore Catalogue
              <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
