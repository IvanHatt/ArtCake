import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles/orderItem.css'

const OrderItem = ({ order }) => {
  return (
    <Container className='media-item '>
      <Link to={`/order/${order._id}`}>
        <Row>
          <Col md='2'>
            <img
              src={order.orderItems[0].image}
              className='align-self-center media-img'
              alt={order.orderItems[0].name}
            ></img>
          </Col>
          <Col md='10'>
            <Row className='media-item-body'>
              <Col md='8'>
                <p>
                  <strong>Order Number: </strong>
                  {order._id}
                </p>
                <p>
                  <strong>Items: </strong>
                  {order.orderItems.length > 1
                    ? order.orderItems.map((orderItem) => orderItem.name) + ','
                    : order.orderItems[0].name}
                </p>
              </Col>
              <Col md='2'>
                {order.isPaid ? (
                  <span class='badge badge-pill badge-success'>Paid</span>
                ) : (
                  <span class='badge badge-pill badge-danger'>Unpaid</span>
                )}
              </Col>
              <Col md='2'>
                {order.isDelivered ? (
                  <span class='badge badge-pill badge-success'>Delivered!</span>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Link>
      <hr></hr>
    </Container>
  )
}

export default OrderItem
