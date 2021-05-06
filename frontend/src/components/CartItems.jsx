import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { removeFromCart } from '../actions/cartActions'
import ProductForm from './ProductForm'

const CartItems = ({ title, small, edit }) => {

  const [update, setUpdate] = useState(false)

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const totalPrice = cartItems
    ? cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0)
    : 0

  return (
    <div className='container cart-items-container'>
      <Row className='w-100'>
        <Col md={12}>{small ? <h2>{title}</h2> : <h1>{title}</h1>}</Col>
        <hr className='w-100'></hr>
      </Row>
      <Row className='w-100'>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} bsPrefix='cart-items'>
                <Row>
                  <Col md={4}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={8} className='px-0'>
                    <div className='d-flex justify-content-between'>
                      <Link to={`/product/${item.product}`}>
                        <h2> {item.name}</h2>
                      </Link>
                      {edit ? (
                        <div>
                          <Button
                            className='p-0'
                            type='button'
                            size={small ? 'sm' : 'lg'}
                            variant='light'
                            onClick={()=> setUpdate(!update)}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                          <Button
                            className='p-0'
                            type='button'
                            size={small ? 'sm' : 'lg'}
                            variant='light'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className='fas fa-trash-alt'></i>
                          </Button>
                        </div>
                      ) : null}
                    </div>
                { update ? <ProductForm forEdit product={item}></ProductForm> : 
                <ul className={`details ${small ? 'small' : ''}`}>
                      <li>Quantity: {item.qty}</li>
                      <li>Price: {item.qty * item.price} ILS</li>
                      <li>
                        Vegan:{' '}
                        {item.vegan === 'true' ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </li>
                      <li>
                        Gluten Free:{' '}
                        {item.gfree === 'true' ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </li>
                      <li>Special requests: None</li>
                    </ul>}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <hr className='w-100'></hr>
            <h2 className='text-right'> Total: {totalPrice} ILS </h2>
          </ListGroup>
        )}
      </Row>
    </div>
  )
}

export default CartItems
