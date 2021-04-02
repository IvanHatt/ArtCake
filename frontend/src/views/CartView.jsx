import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as QueryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import {
  Accordion,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

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
    history.push('/login?redirect=shipping')
  }

  // const totalItems = cartItems
  //   ? cartItems.reduce((acc, item) => acc + Number(item.qty), 0)
  //   : 0

  const totalPrice = cartItems
    ? cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0)
    : 0

  return (
    <Container>
      <div className='card-container my-4 cart-view-container'>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} bsPrefix='cart-items'>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={7} className='details'>
                    <Link to={`/product/${item.product}`}>
                      <h2> {item.name}</h2>
                    </Link>
                    <span>
                      Quantity: <strong>{item.qty} </strong>
                    </span>
                    <span>
                      Vegan:
                      {item.vegan === 'true' ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                    </span>
                    <span>
                      Gluten Free:
                      {item.gfree === 'true' ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                    </span>
                    <span>Special requests: None</span>
                  </Col>
                  <Col md={2}>{item.qty * item.price} ILS</Col>
                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => alert('will edit item')}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash-alt'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <h3 className='text-right'> Total: {totalPrice} ILS </h3>
          </ListGroup>
        )}
      </div>

      <div className='card-container my-4'>
        <h3>Important Info</h3>
        <Accordion>
          <ListGroup variant='flush'>
            <Accordion.Toggle as={ListGroup.Item} variant='link' eventKey='0'>
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <p>Hello! I'm the body</p>
            </Accordion.Collapse>

            <Accordion.Toggle as={ListGroup.Item} variant='link' eventKey='1'>
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <p>Hello! I'm another body</p>
            </Accordion.Collapse>
          </ListGroup>
        </Accordion>
      </div>
      <div>
        {!userInfo && (
          <Link className='btn empty-button p-1' to='/'>
            Checkout as a guest
          </Link>
        )}

        <Button
          type='button'
          className='btn btn-primary'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          SignIn and Checkout
        </Button>
      </div>
    </Container>
  )
}

export default CartView
