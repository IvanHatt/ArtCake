import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Counter from '../components/Counter'

const ProductView = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [vegan, setVegan] = useState(false)
  const [gfree, setGfree] = useState(false)
  const [request, setRequest] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, product._id])

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.id}?qty=${qty}&vegan=${vegan}&gfree=${gfree}`
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <Container>
      <Button
        className='mb-3'
        variant='outline-primary'
        onClick={() => history.goBack()}
      >
        Back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='card-container'>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
                <ListGroup variant='flush'>
                  <span>
                    Vegan Option:{' '}
                    {product.veganOpt ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </span>
                  <span>
                    Gluten Free Option:{' '}
                    {product.glutenFreeOpt ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </span>
                  <span>Allergens: {product.allergens}</span>
                  <span>Dimensions: {product.dimensions}</span>
                  <span>Servings: {product.servings}</span>
                  <hr></hr>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup>
              </Col>
              <Col md={6}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <hr></hr>
                {product.inStock ? (
                  <Form>
                    <Form.Group className='mb-1'>
                      <Form.Label>Quantity: </Form.Label>
                      <Counter
                        min='1'
                        max={product.category === 'Cake' ? '6' : '24'}
                        handleQuantity={(nbr) => setQty(nbr)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-1'>
                      {product.veganOpt && (
                        <div className='d-inline-block mr-3'>
                          <label>Vegan:</label>
                          <input
                            className='mx-2'
                            type='checkbox'
                            value={vegan}
                            onChange={() => setVegan(!vegan)}
                          ></input>
                        </div>
                      )}
                      {product.glutenFreeOpt && (
                        <div className='d-inline-block mr-3'>
                          <label>Gluten Free:</label>
                          <input
                            className='mx-2'
                            type='checkbox'
                            value={gfree}
                            onChange={() => setGfree(!gfree)}
                          ></input>
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group className='mb-1'>
                      <Form.Label>Special requests:</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  <Message variant='danger'> Out of Stock </Message>
                )}
                <div className='product-price'>
                  <h3 className='text-right'>
                    Price:
                    <strong> {qty * product.price} ILS </strong>
                  </h3>
                  <Button
                    onClick={addToCartHandler}
                    className='btn float-right'
                    type='button'
                    disabled={!product.inStock}
                  >
                    Add To Cart
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}></Col>
            </Row>
          </div>

          <Row className='d-none'>
            <Col
              md={6}
              className='review-container'
              style={{ backgroundColor: 'yellow' }}
            >
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProductView
