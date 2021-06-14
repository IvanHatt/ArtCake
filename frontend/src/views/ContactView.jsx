import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const ContactView = () => {
  return (
    <div className='cake-bcg'>
      <Container>
        <Row className='justify-content-md-center'>
          <Col className='form-container'>
            <Row>
              <Col xs={12} md={6}>
                <h1 className='text-center'>Contact Us</h1>
                <Form onSubmit={() => window.alert('Message Sent')}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Your name'
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='comment'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='Write your comments....'
                    ></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary' className='mt-4'>
                    Send
                  </Button>
                </Form>
              </Col>
              <Col xs={12} md={6}>
                <iframe
                  title='location'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1690.610192494792!2d34.77045905820006!3d32.06328746837028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c9d26c41eb1%3A0xb560e464972cdc2c!2sRothschild%20Blvd%2019%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1623671981551!5m2!1sen!2sil'
                  style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    boxShadow: '8px 8px 8px 1px rgba(0, 0, 0, 0.1)',
                  }}
                  allowFullScreen=''
                ></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ContactView
