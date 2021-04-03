import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { removeFromCart } from '../actions/cartActions'

const CartItems = ({ title, children }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const totalPrice = cartItems
    ? cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0)
    : 0

  return (
    <div className='container'>
      <Row>
        <div className='card-container cart-view-container'>
          <h2>{title}</h2>
          <hr />
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} bsPrefix='cart-items'>
                  <Row>
                    <Col md={4}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={8} className='details'>
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
                  </Row>
                  <Row>
                    <Col md={4}>{item.qty * item.price} ILS</Col>
                    <Col md={8}>
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
          <hr />
          {children}
        </div>
      </Row>
    </div>
  )
}

export default CartItems
