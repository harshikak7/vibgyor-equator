
import {defineType, defineField} from 'sanity'

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
          {title: 'Gems & Jewellery', value: 'gems-jewellery'},
          {title: 'Banknotes', value: 'banknotes'},
          {title: 'Coins', value: 'coins'},
          {title: 'Stamps', value: 'stamps'},
          {title: 'Antiques & Artefacts', value: 'antiques'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
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
      of: [{type: 'image', options: {hotspot: true}}],
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
          {title: 'Available', value: 'available'},
          {title: 'Reserved', value: 'reserved'},
          {title: 'Sold', value: 'sold'},
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
