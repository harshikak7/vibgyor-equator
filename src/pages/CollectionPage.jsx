import React from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { urlFor } from '../lib/imageUrl'

const categoryDetails = {
  coins: {
    title: 'Coins',
    description: 'Explore coins from different countries and eras.',
    category: 'coins',
  },
  // banknotes: {
  //   title: 'Banknotes',
  //   description: 'Discover notes that carry stories from around the world.',
  //   category: 'banknotes',
  // },
  stamps: {
    title: 'Stamps',
    description: 'Explore pieces of history through stamps.',
    category: 'stamps',
  },
  'gems-jewellery': {
    title: 'Gems & Jewellery',
    description: 'Discover distinctive pieces chosen to be treasured.',
    category: 'gems-jewellery',
  },
  antiques: {
    title: 'Antiques & Artefacts',
    description: 'Objects that connect us to another time.',
    category: 'antiques',
  },
}

export default function CollectionPage() {
  const { category } = useParams()
  const { products, loading, error } = useProducts()

  const details = categoryDetails[category]

  if (!details) {
    return <main><h1>Collection not found</h1></main>
  }

  const categoryProducts = products.filter(
    product =>
      product.category === details.category &&
      product.availability === 'available'
  )

  return (
    <main className="section-pad">
      <p className="eyebrow">EXPLORE OUR COLLECTION</p>
      <h1>{details.title}</h1>
      <p>{details.description}</p>

      {loading && <p>Loading collection...</p>}
      {error && <p>Unable to load products.</p>}

      {!loading && !error && (
        <div className="collection-grid">
          {categoryProducts.map(product => (
            <a
              key={product._id}
              className="collection-card"
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hello Vibgyor Equator, I am interested in ${product.name}.`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="collection-image">
                {product.coverImage && (
                  <img
                    src={urlFor(product.coverImage).width(800).url()}
                    alt={product.name}
                  />
                )}
              </div>

              <div className="collection-meta">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.country || product.category}</p>
                </div>
                <span className="text-link">Enquire ↗</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && !error && categoryProducts.length === 0 && (
        <p>No available products in this collection right now.</p>
      )}
    </main>
  )
}