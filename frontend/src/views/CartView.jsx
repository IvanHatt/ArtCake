import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import * as QueryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Nav, Row, Col, Button, Container } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import CartItems from '../components/CartItems'

const CartView = ({ match, location, history }) => {
  const productId = match.params.id

  const { qty, vegan, gfree } = location.search
    ? QueryString.parse(location.search)
    : { qty: null, vegan: null, gfree: null }

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, vegan, gfree))
    }
  }, [dispatch, productId, qty, vegan, gfree])

  const checkoutHandler = () => {
    userInfo
      ? history.push('/checkout?redirect=cart')
      : history.push('/login?redirect=cart')
  }

  return (
    <Container>
      <div className='card-container'>
        <CartItems title='Shopping Cart'></CartItems>
      </div>
      <div className='card-container info-menu my-4'>
        <h3>Important Info</h3>
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='first'>Shipping</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second'>Payment</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <p>
                    Shipping to your address has a cost of 50ILS. For orders
                    more than 500ILS, shipping is free of charge. Area of
                    shipping: Central Israel For more questions, contact us
                  </p>
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <p>
                    Payment can be done with Paypal or using Credit Card: Visa,
                    Mastercard or Diners
                  </p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <div className='d-flex justify-content-end'>
        <Button
          variant='primary'
          className='btn'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          {userInfo ? 'Checkout' : 'SignIn and Checkout'}
        </Button>
      </div>
    </Container>
  )
}

export default CartView
