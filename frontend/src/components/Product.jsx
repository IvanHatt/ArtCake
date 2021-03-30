import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import './styles/product.css'

const Product = ({ product }) => {
  const [showPrice, setShowPrice] = useState(false)

  return (
    <Card
      onMouseEnter={() => setShowPrice(true)}
      onMouseLeave={() => setShowPrice(false)}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} alt={product.title} variant='top' />
        {showPrice &&
          (product.inStock ? (
            <div className='product-description'>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.price} ILS </Card.Text>
            </div>
          ) : (
            <div className='product-description'>
              <Card.Title> Out of Stock </Card.Title>
            </div>
          ))}
      </Link>
    </Card>
  )
}

export default Product
