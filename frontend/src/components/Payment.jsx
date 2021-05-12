import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

const Payment = ({ nextStep }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
  }
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Option 2'
              id='option2'
              name='paymentMethod'
              value='option2'
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Option 3'
              id='option3'
              name='paymentMethod'
              value='option3'
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' size='sm'>
          Select Method
        </Button>
      </Form>
    </>
  )
}

export default Payment
