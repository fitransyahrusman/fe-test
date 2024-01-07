// components/ProductCard.tsx
import React from 'react'

interface ProductCardProps {
  product: {
    id: number
    title: string
    description: string
    price: number
    category: string
    thumbnail: string
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, price, category, thumbnail } = product

  return (
    <div className='product-card'>
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>${price}</p>
      <p>Category: {category}</p>
    </div>
  )
}

export default ProductCard
