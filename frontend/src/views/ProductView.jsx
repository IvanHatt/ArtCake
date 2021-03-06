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
import ProductForm from '../components/ProductForm'

const ProductView = ({ history, match }) => {
  const [seeReview, setSeeReview] = useState(false)
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

  const addToCartHandler = (qty, vegan, gfree) => {
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
    <Container className='mb-5'>
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
                <ListGroup variant='flush' className='product-details'>
                  <span>
                    <strong>Vegan Option: </strong>{' '}
                    {product.veganOpt ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </span>
                  <span>
                    <strong> Gluten Free Option: </strong>{' '}
                    {product.glutenFreeOpt ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </span>
                  <span>
                    {' '}
                    <strong> Allergens: </strong> {product.allergens}
                  </span>
                  <span>
                    {' '}
                    <strong> Dimensions: </strong> {product.dimensions}
                  </span>
                  <span>
                    {' '}
                    <strong> Servings:</strong> {product.servings}
                  </span>
                  <hr></hr>
                </ListGroup>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <Button
                  size='sm'
                  type='button'
                  className='ml-2 inline-block'
                  onClick={() => setSeeReview(!seeReview)}
                >
                  <i className='fas fa-angle-down'> See reviews </i>
                </Button>
              </Col>
              <Col md={6}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <hr></hr>
                {product.inStock ? (
                  <ProductForm
                    product={product}
                    addToCartHandler={addToCartHandler}
                  ></ProductForm>
                ) : (
                  <div>Out of Stock</div>
                )}
              </Col>
            </Row>
          </div>
          {/* Reviews */}
          {seeReview && (
            <Row>
              <Col md={6} className='review-container'>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <small>{review.createdAt.substring(0, 10)}</small>
                      <p>"{review.comment}"</p>
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
                        Please <Link to='/login'>sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  )
}

export default ProductView
