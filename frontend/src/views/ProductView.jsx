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
  InputGroup,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

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
    history.push(`/cart/${match.params.id}?qty=${qty}`)
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
      <Link className='btn empty-button my-3' to='/shop'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='product-container'>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
                <ListGroup variant='flush'>
                  <span>
                    Vegan Option:{' '}
                    {product.veganOpt ? (
                      <i class='fas fa-check'></i>
                    ) : (
                      <i class='fas fa-times'></i>
                    )}
                  </span>
                  <span>
                    Gluten Free Option:{' '}
                    {product.glutenFreeOpt ? (
                      <i class='fas fa-check'></i>
                    ) : (
                      <i class='fas fa-times'></i>
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
                    <Form.Row>
                      <Col>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Quantity: </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            <option value='1'>1</option>
                            <option value='1'>2</option>
                            <option value='1'>3</option>
                            <option value='1'>4</option>
                            <option value='1'>5</option>
                          </Form.Control>
                        </InputGroup>
                      </Col>
                      {product.veganOpt && (
                        <Col>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Vegan: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <InputGroup.Checkbox
                              value={vegan}
                              onChange={() => setVegan(!vegan)}
                            />
                          </InputGroup>
                        </Col>
                      )}
                      {product.glutenFreeOpt && (
                        <Col>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Gluten Free: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <InputGroup.Checkbox
                              value={gfree}
                              onChange={() => setGfree(!gfree)}
                            />
                          </InputGroup>
                        </Col>
                      )}
                    </Form.Row>
                    <Form.Group>
                      <Form.Label>Special requests:</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={request}
                        onChange={(e) => setRequest(e.target)}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  <Message variant='danger'> Out of Stock </Message>
                )}
                <div className='align-self-end'>
                  <h3 className='text-right'>
                    Price:
                    <strong> {product.price} ILS </strong>
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

          <Row>
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
