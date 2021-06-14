import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import ProductsRender from '../components/ProductsRender'
import Filter from '../components/Filter'

// **** frontend-approach: use endpoint to get all products at once, and then if needed filter them at front side. Can be slow for large amounts

// *** backend-approach: used here with pagination and search/filter is to make a call to server for every page and for every search. As everything is handled at backend, this can be useful for large amounts of data (as data arrives at chunks) ***

const serverApproach = false

const ShopView = ({ match }) => {
  //for use in search bar
  const keyword = match.params.keyword

  //pagination
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const filters = useSelector((state) => state.filters)

  const { veganOption, gfreeOption, price } = filters

  const { loading, error, page, pages } = productList
  let { products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, serverApproach))
  }, [dispatch, keyword, pageNumber])

  // filter product list
  if (veganOption) products = products.filter((prod) => prod.veganOpt === true)
  if (gfreeOption)
    products = products.filter((prod) => prod.glutenFreeOpt === true)
  if (price) products = products.filter((prod) => prod.price <= price)

  return (
    <Container>
      <h1 className='text-center'>Our Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Filter />
            </Col>
            <Col md={9}>
              <ProductsRender products={products} />
            </Col>
          </Row>
          {serverApproach && (
            <div className='w-100'>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default ShopView
