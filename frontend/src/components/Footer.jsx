import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles/footer.css'

const Footer = () => {
  return (
    <footer className='main-footer'>
      <Container className='footer-content'>
        <Row>
          <Col xl={9} lg={8} md={6}>
            <h2>ArtCake</h2>
            <Link to='/contact'>
              <i className='fas fa-at'></i> Contact Us
            </Link>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <h2 className='text-center'>Find Us!</h2>
            <ul className='social-network d-flex justify-content-around'>
              <li>
                <Link to='/' className='social-icon faFacebook'>
                  <i class='fab fa-facebook'></i>
                </Link>
              </li>
              <li>
                <Link to='/' className='social-icon faInstagram'>
                  <i class='fab fa-instagram'></i>
                </Link>
              </li>
              <li>
                <Link to='/' className='social-icon faLinkedin'>
                  <i class='fab fa-linkedin'></i>
                </Link>
              </li>
              <li>
                <Link to='/' className='social-icon faTwitter'>
                  <i class='fab fa-twitter'></i>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <div className='text-center'>
          <small>© {new Date().getFullYear()} Copyright: Ivan Hattemer</small>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
