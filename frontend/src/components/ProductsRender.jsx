import React from 'react'
import Message from './Message'
import Product from './Product'

const ProductsRender = ({ products }) => {
  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <Product product={product} key={product._id} />
        ))
      ) : (
        <Message variant='danger'>
          <p className='text-center'>
            <span> No cakes matching your criteria...</span>
          </p>
        </Message>
      )}
    </div>
  )
}

export default ProductsRender
