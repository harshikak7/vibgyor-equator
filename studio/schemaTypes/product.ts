
import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Product URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gems & Jewellery', value: 'gems-jewellery' },
          { title: 'Banknotes', value: 'banknotes' },
          { title: 'Coins', value: 'coins' },
          { title: 'Stamps', value: 'stamps' },
          { title: 'Antiques & Artefacts', value: 'antiques' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Jewellery Type - only visible for Gems & Jewellery
    defineField({
      name: 'jewelleryType',
      title: 'Jewellery Type',
      description: 'Select the type of jewellery this product belongs to.',
      type: 'string',
      options: {
        list: [
          { title: 'Jewellery Set', value: 'jewellery-set' },
          { title: 'Ring', value: 'ring' },
          { title: 'Pendant', value: 'pendant' },
          { title: 'Necklace', value: 'necklace' },
          { title: 'Bracelet', value: 'bracelet' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Ganesh Jewellery Set', value: 'ganesh-jewellery-set' },
          { title: 'Crystal & Silver Pendant', value: 'crystal-silver-pendant' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.category !== 'gems-jewellery',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.category === 'gems-jewellery' && !value) {
            return 'Please select a jewellery type.'
          }
          return true
        }),
    }),

    // Antique Type - only visible for Antiques
    defineField({
      name: 'antiqueType',
      title: 'Antique Type',
      description: 'Choose whether this antique is a painting or a handicraft.',
      type: 'string',
      options: {
        list: [
          { title: 'Painting', value: 'painting' },
          { title: 'Handicrafts', value: 'handicrafts' },
        ],
        layout: 'radio',
      },
      hidden: ({ document }) => document?.category !== 'antiques',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.category === 'antiques' && !value) {
            return 'Please select an antique type.'
          }
          return true
        }),
    }),

    // Painting Type - only visible when Antique Type is Painting
    defineField({
      name: 'paintingType',
      title: 'Painting Type',
      description: 'Choose the type of painting.',
      type: 'string',
      options: {
        list: [
          { title: 'Gemstone Painting', value: 'gemstone-painting' },
          { title: 'Cloth Painting', value: 'cloth-painting' },
        ],
        layout: 'radio',
      },
      hidden: ({ document }) =>
        document?.category !== 'antiques' ||
        document?.antiqueType !== 'painting',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.document?.category === 'antiques' &&
            context.document?.antiqueType === 'painting' &&
            !value
          ) {
            return 'Please select a painting type.'
          }
          return true
        }),
    }),

    defineField({
      name: 'coverImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Additional Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'country',
      title: 'Country / Origin',
      description: 'Especially useful for coins. Optional for other categories.',
      type: 'string',
    }),

    defineField({
      name: 'year',
      title: 'Year / Date',
      description: 'Enter the year or date printed on the item, if known.',
      type: 'string',
    }),

    defineField({
      name: 'denomination',
      title: 'Denomination',
      description: 'For example: 2 Centavos, 5 Rupees, etc.',
      type: 'string',
    }),

    defineField({
      name: 'series',
      title: 'Series / Collection',
      description: 'Useful for banknotes and other grouped collectibles.',
      type: 'string',
    }),

    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      description: 'Use smaller numbers for products you want to show first.',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
