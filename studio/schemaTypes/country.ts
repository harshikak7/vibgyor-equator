
import { defineType, defineField } from "sanity";

export const country = defineType({
  name: "country",
  title: "Coin Catalogue Countries",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Country Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Country Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "year",
      title: "Catalogue Year",
      type: "string",
      description: "The year to display below the country name.",
    }),

    defineField({
      name: "isIndia",
      title: "India Feature Section",
      type: "boolean",
      description: "Enable this only for India. India appears in the large feature section.",
      initialValue: false,
    }),

    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Controls the order of the 12 country cards. Lower numbers appear first.",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
      isIndia: "isIndia",
      year: "year",
    },

    prepare({ title, media, isIndia, year }) {
      return {
        title,
        subtitle: isIndia
          ? "India feature section"
          : `Country catalogue${year ? ` · ${year}` : ""}`,
        media,
      };
    },
  },
});
