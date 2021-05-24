import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const Shipping = ({ nextStep }) => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [apartment, setApartment] = useState('')
  const dispatch = useDispatch()

  const { shippingAddress } = useSelector((state) => state.cart)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(`${address} ${apartment}, ${city}`))
    nextStep('payment')
  }

  return (
    <div className='pt-4 pl-5 pb-3'>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='apartment'>
          <Form.Label>Apartment</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Apartment or House number'
            value={apartment}
            required
            onChange={(e) => setApartment(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          size='sm'
          type='submit'
          variant='primary'
          className='d-block ml-auto mr-0'
        >
          Set address
        </Button>
      </Form>
    </div>
  )
}

export default Shipping
