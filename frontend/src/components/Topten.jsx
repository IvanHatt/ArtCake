import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Carousel } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import './styles/topten.css'
import Rating from './Rating.jsx'
import useTopten from '../hooks/useTopten.js'

const Topten = () => {
  const { loading, error, topProducts } = useTopten()

  return (
    <div className='topten'>
      <Container className='topten-container'>
        <h1 className='text-center'>Our Top Five </h1>
        <p className='text-center'>According to our customers' reviews</p>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Carousel interval={null} indicators={false}>
            {topProducts.map((product) => (
              <Carousel.Item key={product._id}>
                <div className='topten-img-container'>
                  <img
                    className='topten-img'
                    src={product.image}
                    alt={product.name}
                  />
                  <Link to={`/product/${product._id}`}>
                    <h3 className='mt-3 mb-0'> {product.name}</h3>
                  </Link>
                  <Rating value={product.rating} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  )
}

export default Topten
