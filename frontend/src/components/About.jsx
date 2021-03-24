import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import about from '../images/about-img.jpg'
import './styles/about.css'

const About = () => {
  return (
    <div className='about'>
      <Container>
        <div className='about-container'>
          <Row>
            <Col md={7}>
              <h1 className='text-center'>About Us</h1>
              <p>
                Nullam fermentum, lacus a bibendum venenatis, sem eros aliquet
                ex, at molestie ex orci sed metus. Fusce lobortis, tortor sed
                rutrum feugiat, sem libero vehicula erat. Nullam fermentum,
                lacus a bibendum venenatis, sem eros aliquet ex, at molestie ex
                orci sed metus. Fusce lobortis, tortor sed rutrum feugiat, sem
                libero vehicula erat. Nullam fermentum, lacus a bibendum
                venenatis, sem eros aliquet ex, at molestie ex orci sed metus.
                Fusce lobortis, tortor sed rutrum feugiat, sem libero vehicula
                erat.
              </p>
            </Col>
            <Col md={5}>
              <Image src={about} fluid></Image>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default About
