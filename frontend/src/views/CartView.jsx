import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Accordion, 
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartView = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Container>
      <div className='card-container my-4'>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      <h2> {item.name}</h2>
                    </Link>
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      <option value='1'>1</option>
                      <option value='1'>2</option>
                      <option value='1'>3</option>
                      <option value='1'>4</option>
                      <option value='1'>5</option>
                    </Form.Control>
                    <p>Vegan</p>
                    <p>Gluten Free</p>
                    <p>Special requests: None</p>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <h3 className='text-right'> Total: 200ILS </h3>
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
    </Container>
  )
}

export default CartView
