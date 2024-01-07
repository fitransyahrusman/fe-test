// components/ProductPage.tsx
import React from 'react'

interface ProductPageProps {
  product: {
    id: number
    title: string
    description: string
    price: number
    images: string[]
    availability: number
  }
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const { title, description, price, images, availability } = product

  return (
    <div>
      <h1>{title}</h1>
      <div className='product-images'>
        {/* TO DO */}
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
      </div>
      <p>{description}</p>
      <p>${price}</p>
      <p>Availability: {availability}</p>
    </div>
  )
}

export default ProductPage
