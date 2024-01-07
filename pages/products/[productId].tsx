// pages/products/[productId].tsx
import { GetStaticProps, GetStaticPaths } from 'next'
import axios from 'axios'
import ProductPage from '../../components/ProductPage'

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

const ProductDetail: React.FC<ProductPageProps> = ({ product }) => {
  return <ProductPage product={product} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://dummyjson.com/docs/products')
  const products = response.data.products

  const paths = products.map((product) => ({
    params: { productId: product.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  const { productId } = params
  const response = await axios.get(
    `https://dummyjson.com/docs/products/${productId}`,
  )
  const product = response.data.product

  return {
    props: {
      product,
    },
  }
}

export default ProductDetail
