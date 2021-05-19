import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditView = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [allergens, setAllergens] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [servings, setServings] = useState('')
  const [veganOpt, setVeganOpt] = useState(false)
  const [glutenFreeOpt, setGlutenFreeOpt] = useState(false)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [inStock, setInStock] = useState(true)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/dashboard/productslist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setAllergens(product.allergens)
        setDimensions(product.dimensions)
        setServings(product.servings)
        setVeganOpt(product.veganOpt)
        setGlutenFreeOpt(product.glutenFreeOpt)
        setPrice(product.price)
        setImage(product.image)
        setCategory(product.category)
        setInStock(product.inStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        category,
        description,
        allergens,
        dimensions,
        servings,
        veganOpt,
        glutenFreeOpt,
        price,
        inStock,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/dashboard/productslist' className='btn my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={(e) => uploadFileHandler(e)}
            ></Form.File>
            {uploading && <Loader />}

            <Form.Group controlId='inStock'>
              <Form.Check
                type='checkbox'
                checked={inStock}
                label='In Stock?'
                value={inStock}
                onChange={() => setInStock(!inStock)}
              />
            </Form.Group>
            <Form.Group controlId='veganOpt'>
              <Form.Check
                type='checkbox'
                label='Vegan option available?'
                value={veganOpt}
                checked={veganOpt}
                onChange={() => setVeganOpt(!veganOpt)}
              />
            </Form.Group>
            <Form.Group controlId='glutenFreeOpt'>
              <Form.Check
                type='checkbox'
                label='Gluten Free Available?'
                value={glutenFreeOpt}
                checked={glutenFreeOpt}
                onChange={() => setGlutenFreeOpt(!glutenFreeOpt)}
              />
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                rows='5'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='allergens'>
              <Form.Label>Allergens</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter allergens'
                value={allergens}
                onChange={(e) => setAllergens(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='dimensions'>
              <Form.Label>Dimensions</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter dimensions'
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='servings'>
              <Form.Label>Servings</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter servings'
                value={servings}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditView
