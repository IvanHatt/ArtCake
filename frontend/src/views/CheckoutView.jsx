import React from 'react'
import { Button, Col, Row, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from '../components/CartItems'
import Delivery from '../components/Delivery'

const CheckoutView = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className='container'>
      <Row>
        <Col md={4}>
          <div className='card-container'>
            <CartItems title='My Order' small></CartItems>
          </div>
        </Col>
        <Col md={8}>
          <div className='card-container'>
            <Tabs defaultActiveKey='shipping' id='uncontrolled-tab-example'>
              <Tab eventKey='shipping' title='Delivery'>
                <Delivery />
              </Tab>
              <Tab eventKey='details' title='Details'>
                <p>Details </p>
              </Tab>
              <Tab eventKey='payment' title='Payment'>
                <p>Payment</p>
              </Tab>
            </Tabs>

            <Button variant='primary' className='d-block ml-auto mr-0'>
              Finish
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CheckoutView
