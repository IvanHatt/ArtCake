import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './styles/hero.css'

const Hero = () => {
  return (
    <section className='hero'>
      <Container>
        <Row>
          <Col md={6}>
            <div>
              <h1>There is always room for some CAKE!</h1>
              <p>
                Nullam fermentum, lacus a bibendum venenatis, sem eros aliquet
                ex, at molestie ex orci sed metus. Fusce lobortis, tortor sed
                rutrum feugiat, sem libero vehicula erat.
              </p>
              <LinkContainer to='/shop'>
                <Button className='btn btn-primary'>Shop Here</Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
