// pages/index.tsx
import React, { useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  thumbnail: string
}

interface HomeProps {
  products: Product[]
}

const Home: React.FC<HomeProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleFilter = (category: string) => {
    const selectedCategory = category || 'all'

    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory,
      )
      setFilteredProducts(filtered)
    }
  }

  const handleSort = (order: 'asc' | 'desc') => {
    const sorted = [...filteredProducts].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price,
    )
    setFilteredProducts(sorted)
  }

  return (
    <div>
      <div className='filter-sort-options'>
        <label>Filter by Category:</label>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value='all'>All</option>
          <option value='smartphones'>Smartphones</option>
          {/* TO DO */}
        </select>

        <label>Sort by Price:</label>
        <select onChange={(e) => handleSort(e.target.value as 'asc' | 'desc')}>
          <option value='asc'>Low to High</option>
          <option value='desc'>High to Low</option>
        </select>
      </div>

      <div className='product-list'>
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <a>
              <ProductCard product={product} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/docs/products')
    const data = response.data

    if (!data || !data.products) {
      throw new Error('Invalid API response')
    }

    const products: Product[] = data.products

    return {
      props: {
        products,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
    return {
      props: {
        products: [],
      },
    }
  }
}

export default Home
