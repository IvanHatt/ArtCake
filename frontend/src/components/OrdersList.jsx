import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { listMyOrders } from '../actions/orderActions'
import OrderItem from '../components/OrderItem'

const OrdersList = ({ history }) => {
  const dispatch = useDispatch()

  //   const userDetails = useSelector((state) => state.userDetails)
  //   const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listMyOrders())
    }
  }, [dispatch, history, userInfo])

  return (
    <Container>
      {!loadingOrders &&
        !errorOrders &&
        orders.length > 0 &&
        orders.map((order, i) => <OrderItem order={order} key={i} />)}
    </Container>
  )
}

export default OrdersList
