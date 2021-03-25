import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './styles/form.css'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6} className='form-container'>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
