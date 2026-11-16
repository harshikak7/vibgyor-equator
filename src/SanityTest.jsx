import React, { useEffect, useState } from 'react'
import { getAllProducts } from './lib/products'
import { urlFor } from './lib/imageUrl'

export default function SanityTest() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading products from Sanity...</p>
  if (error) return <p>Sanity error: {error}</p>

  return (
    <main style={{ padding: '40px' }}>
      <h1>Sanity Connection Test</h1>
      <p>Products found: {products.length}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        {products.map((product) => (
          <div key={product._id}>
            {product.coverImage && (
              <img
                src={urlFor(product.coverImage).width(500).url()}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}

            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Country: {product.country || 'Not specified'}</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </main>
  )
}