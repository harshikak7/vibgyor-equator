
const countryCodes = {
  Australia: "au",
  Austria: "at",
  Bahrain: "bh",
  Belgium: "be",
  Brazil: "br",
  Canada: "ca",
  Chile: "cl",
  Denmark: "dk",
  "Dominican Republic": "do",
  Ethiopia: "et",
  France: "fr",
  Germany: "de",
  Ghana: "gh",
  Greece: "gr",
  "Hong Kong": "hk",
  India: "in",
  Iran: "ir",
  Iraq: "iq",
  Israel: "il",
  Italy: "it",
  "Ivory Coast": "ci",
  Japan: "jp",
  Jordan: "jo",
  Kuwait: "kw",
  Liberia: "lr",
  Libya: "ly",
  Malaysia: "my",
  Mauritius: "mu",
  Mozambique: "mz",
  Nepal: "np",
  Netherlands: "nl",
  Nigeria: "ng",
  Norway: "no",
  Philippines: "ph",
  Portugal: "pt",
  Qatar: "qa",
  "Saudi Arabia": "sa",
  Senegal: "sn",
  Singapore: "sg",
  Somaliland: null,
  "South Korea": "kr",
  Spain: "es",
  "Sri Lanka": "lk",
  Switzerland: "ch",
  Taiwan: "tw",
  Thailand: "th",
  Turkey: "tr",
  UAE: "ae",
  UK: "gb",
  USA: "us",
  Venezuela: "ve",
  Yugoslavia: null,
};

export function getCountryFlag(countryName) {
  if (!countryName) return null;

  const normalizedName = countryName.trim().toLowerCase();

  const country = Object.keys(countryCodes).find(
    (name) => name.toLowerCase() === normalizedName
  );

  if (!country || !countryCodes[country]) return null;

  return `https://flagcdn.com/w640/${countryCodes[country]}.png`;
}
