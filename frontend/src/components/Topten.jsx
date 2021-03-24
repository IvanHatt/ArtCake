import React from 'react'
import { Container, Carousel } from 'react-bootstrap'
import './styles/topten.css'

const Topten = () => {
  return (
    <div className='topten'>
      <Container className='topten-container'>
        <h1 className='text-center'>Our favorite cakes</h1>
        <Carousel interval={null}>
          <Carousel.Item>
            <div className='topten-img-container'>
              <img
                className='topten-img'
                src='/images/cake-crema.png'
                alt='First slide'
              />
              <h3>Cream Cake</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='topten-img-container'>
              <img
                className='topten-img'
                src='/images/cake-flan.png'
                alt='Second slide'
              />
              <h3>Flan Cake</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='topten-img-container'>
              <img
                className='topten-img'
                src='/images/cake-frutosrojos.png'
                alt='Third slide'
              />
              <h3>Berries Cake</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  )
}

export default Topten
