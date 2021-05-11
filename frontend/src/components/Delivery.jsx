import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { saveDelivery } from '../actions/cartActions'
import Message from './Message'
// import Shipping from './Shipping'

const Delivery = ({ nextStep }) => {
  const [delivery, setDelivery] = useState('')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveDelivery(delivery))
    delivery === 'pickup' ? nextStep('payment') : nextStep('shipping')
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
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
          {delivery && delivery === 'shipping' && (
            <Message>
              <p>Shipping has an extra cost of 50 ils</p>
            </Message>
          )}
        </Form.Group>
        <Button variant='primary' type='submit' size='sm'>
          {delivery === 'shipping' ? 'Set shipping address' : 'Continue'}
        </Button>
      </Form>
    </div>
  )
}

export default Delivery
