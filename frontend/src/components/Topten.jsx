import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Carousel } from 'react-bootstrap'
import { getTopProducts } from '../actions/productActions.js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import './styles/topten.css'

const Topten = () => {
  const topProductList = useSelector((state) => state.topProductList)
  const { loading, error, topProducts } = topProductList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

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
              <Carousel.Item>
                <div className='topten-img-container'>
                  <img
                    className='topten-img'
                    src={product.image}
                    alt={product.name}
                  />
                  <h3 className='mt-3'>{product.name}</h3>
                  <h2>Rating: {product.rating}</h2>
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
