import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import './styles/hero.css'

const Hero = () => {
  return (
    <section className='hero'>
      <Container className='h-100'>
        <Row className='h-100 align-items-center'>
          <Col md={6}>
            <div>
              <h1>There is always room for some CAKE!</h1>
              <p>
                Nullam fermentum, lacus a bibendum venenatis, sem eros aliquet
                ex, at molestie ex orci sed metus. Fusce lobortis, tortor sed
                rutrum feugiat, sem libero vehicula erat.
              </p>
              <Button className='full-button'>Shop Here</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
