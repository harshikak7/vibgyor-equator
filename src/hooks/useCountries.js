
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity";

const COUNTRIES_QUERY = `
  *[_type == "country"] | order(displayOrder asc, name asc) {
    _id,
    _type,
    name,
    "slug": slug.current,
    image,
    year,
    isIndia,
    displayOrder
  }
`;

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        console.log("Fetching country documents from Sanity...");

        const data = await sanityClient.fetch(COUNTRIES_QUERY);

        console.log("Countries returned from Sanity:", data);
        console.log("Number of countries:", data?.length);

        setCountries(data || []);
      } catch (err) {
        console.error("Sanity country fetch failed:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return { countries, loading, error };
}
