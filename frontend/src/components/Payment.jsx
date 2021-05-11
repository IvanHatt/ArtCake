import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'

const Payment = ({ nextStep }) => {
  const cart = useSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()

  //   Calculate prices
  // addDecimals is just a fucntion to make numbers appear with 2 decimals even if it's 12.5
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice =
    cart.delivery === 'shipping'
      ? addDecimals(cart.itemsPrice > 500 ? 0 : 50)
      : '0'

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        delivery: cart.delivery,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
    window.alert('saved')
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
          Place order and pay
        </Button>
      </Form>
    </>
  )
}

export default Payment
