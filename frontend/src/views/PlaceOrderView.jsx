import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import CartItems from '../components/CartItems'

const PlaceOrderView = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector((state) => state.cart)
  const deliveryType = cart.delivery

  if (!cart.delivery) {
    history.push('/checkout?step=delivery')
  } else if (!cart.paymentMethod) {
    history.push('/checkout?step=payment')
  }

  //   Calculate prices
  // addDecimals is just a fucntion to make numbers appear with 2 decimals even if it's 12.5
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 50)

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  //if everything ok, state success, redirect to /order/${order._id}
  // order._id doesnt exist yet, so i cannot add it to the [ ] below, so I disable the eslint notification
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className='card-container'>
            <h2> Order details</h2>
            <p>
              <strong>Name: </strong> {userInfo.name}
            </p>
            <p>
              <strong>Email: </strong> {userInfo.email}
            </p>
            {cart.delivery && (
              <p>
                <strong> Delivery: </strong>
                {deliveryType === 'pickup'
                  ? 'Self Pickup from store'
                  : 'Shipping'}
              </p>
            )}
            {deliveryType && deliveryType === 'shipping' && (
              <p>
                <strong>Address: </strong> {cart.shippingAddress}
              </p>
            )}
            <p>
              <strong>Items: </strong>
            </p>
            <CartItems small></CartItems>
          </div>
        </Col>
        <Col md={8}>
          <div className='card-container'></div>
        </Col>
      </Row>
    </Container>
  )
}

export default PlaceOrderView
