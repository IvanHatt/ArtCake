import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as QueryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import {
  Tab,
  Nav,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    userInfo
      ? history.push('/checkout?redirect=cart')
      : history.push('/login?redirect=cart')
  }

  // const totalItems = cartItems
  //   ? cartItems.reduce((acc, item) => acc + Number(item.qty), 0)
  //   : 0

  const totalPrice = cartItems
    ? cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0)
    : 0

  return (
    <Container>
      <div className='card-container'>
        <CartItems title='Shopping Cart' edit></CartItems>
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Debitis vero reiciendis pariatur voluptatibus adipisci, qui
                    assumenda, enim ipsam totam blanditiis velit dolor vitae
                    saepe ipsum vel quibusdam! Minima, quaerat aut?
                  </p>
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat deleniti impedit maxime magnam expedita quis, neque
                    dolorum explicabo ullam nam incidunt ex, cumque commodi
                    earum. Incidunt iste pariatur libero? Deleniti!
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
