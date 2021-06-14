import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderView = ({ history }) => {
  const dispatch = useDispatch()
  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin
  const cart = useSelector((state) => state.cart)

  if (!cart.delivery) {
    history.push('/checkout?step=delivery')
  } else if (!cart.paymentMethod) {
    history.push('/checkout?step=payment')
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice =
    cart.delivery === 'shipping' ? (cart.itemsPrice > 500 ? 0 : 50) : '0'

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  //if everything ok, state success, redirect to /order/${order._id}
  // order._id doesnt exist yet, so i cannot add it to the [ ] below, so I disable the eslint notification

  useEffect(() => {
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
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  return (
    <Container>
      {error && (
        <Message error>
          <p>{error}</p>
        </Message>
      )}
    </Container>
  )
}

export default PlaceOrderView
