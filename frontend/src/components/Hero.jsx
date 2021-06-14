import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './styles/hero.css'

const Hero = ({ children }) => {
  return (
    <section className='hero'>
      <Container>
        <Row>
          <Col md={6}>
            <div>
              {children}
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
