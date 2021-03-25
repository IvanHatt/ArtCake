import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const ContactView = () => {
  return (
    <FormContainer>
      <h1 className='text-center'>Contact Us</h1>

      <Form onSubmit={console.log('send')}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Your name'></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter email'></Form.Control>
        </Form.Group>

        <Form.Group controlId='comment'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Write your comments....'
          ></Form.Control>
        </Form.Group>
        <Button type='button' variant='primary' className='mt-4'>
          Send
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ContactView
