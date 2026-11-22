
export const allProductsQuery = `
  *[_type == "product"] | order(displayOrder asc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    jewelleryType,
    antiqueType,
    paintingType,
    country,
    year,
    denomination,
    series,
    description,
    availability,
    featured,
    displayOrder,
    coverImage,
    gallery
  }
`;
