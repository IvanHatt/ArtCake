import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from './Message'
import Shipping from './Shipping'

const Delivery = () => {
  const [delivery, setDelivery] = useState('')

  return (
    <div>
      <Form>
        <p>Choose delivery method:</p>
        <Form.Group controlId='delivery'>
          <Form.Check
            type='radio'
            label='Pick up from store'
            name='delivery'
            id='pickup'
            value='pickup'
            onChange={(e) => setDelivery(e.target.value)}
          />
          {delivery && delivery === 'pickup' && (
            <Message>
              <p>Pickup from Tel Aviv</p>
              <small> Our crew will contact you by phone</small>
            </Message>
          )}
          <Form.Check
            type='radio'
            label='Shipping'
            name='delivery'
            id='shipping'
            value='shipping'
            onChange={(e) => setDelivery(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
      {delivery && delivery === 'shipping' && <Shipping />}
    </div>
  )
}

export default Delivery
