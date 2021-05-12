import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderView = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //// check this !! This was added because itemsPrice was not stored in orderDetails, so check the schema Order, and maybe u can add it there
  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
  ///////////////////////////////////////////

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    /// dinamically add paypal api sdk script, using vanilla JS
    const addPayPalScript = async () => {
      // data from axios, rename it to clientId
      const { data: clientId } = await axios.get('/api/config/paypal')

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    //if no order made go on - then when is paid, is gonna enter again (succespay true) and when delivered also
    if (!order || successPay || successDeliver || order._id !== orderId) {
      // first reset order pay and deliver, dispatch directly, this returns empty object see reducer, if not it will loop
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo])

  //paymentresult from react-paypal-button
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  /// only admin, chage status to delivered
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container className='mb-5'>
      <h1>My Order </h1>
      <p>Order number: {order._id}</p>
      <Row>
        <Col md={8}>
          <div className='card-container'>
            <h2>Order details</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            {order.shippingAddress !== null && (
              <p>
                <strong>Address: </strong> {order.shippingAddress}
              </p>
            )}
            <p>
              <strong>Delivery Status: </strong>
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
            <hr></hr>
            <h2>Payment</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            <p>
              <strong> Status: </strong>
            </p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
            <hr></hr>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        <p>{item.qty * item.price} ILS</p>
                        {order.shippingPrice > 1 && (
                          <p> {order.shippingPrice} ILS (Shipping) </p>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <hr></hr>
            <h2 className='text-right'> Total price: {order.totalPrice} ILS</h2>
          </div>
        </Col>
        <Col md={4}>
          {!order.isPaid && (
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Pay here</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
                {loadingDeliver && <Loader />}
              </ListGroup>
            </Card>
          )}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <Button
              type='button'
              className='btn btn-block'
              onClick={deliverHandler}
            >
              Mark As Delivered
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default OrderView
