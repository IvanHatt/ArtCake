import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Tabs, Tab, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import * as QueryString from 'query-string'
import CartItems from '../components/CartItems'
import Delivery from '../components/Delivery'
import Shipping from '../components/Shipping'
import Payment from '../components/Payment'

const CheckoutView = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin)

  const { delivery: deliveryType, shippingAddress } = useSelector(
    (state) => state.cart
  )

  const { userInfo } = userLogin
  console.log(userInfo)

  const [step, setStep] = useState('delivery')

  //when query string step, then setStep
  useEffect(() => {
    if (QueryString.parse(location.search).step) {
      setStep(QueryString.parse(location.search).step)
    }
  }, [location.search])

  const nextStep = (step) => {
    if (step === 'finish') {
      history.push('/placeorder')
    } else {
      history.push(`checkout?step=${step}`)
    }
  }

  return (
    <div className='container'>
      <Row>
        <Col md={4}>
          <div className='card-container'>
            <h2> Order details</h2>
            <p>
              <strong>Name: </strong> {userInfo.name}
            </p>
            <p>
              <strong>Email: </strong> {userInfo.email}
            </p>
            {deliveryType && (
              <p>
                <strong> Delivery: </strong>
                {deliveryType === 'pickup'
                  ? 'Self Pickup from store'
                  : 'Shipping'}
              </p>
            )}
            {deliveryType && deliveryType === 'shipping' && (
              <p>
                <strong>Address: </strong> {shippingAddress}
              </p>
            )}
            <p>
              <strong>Items: </strong>
            </p>
            <CartItems small></CartItems>
          </div>
        </Col>
        <Col md={8}>
          <div className='card-container checkout'>
            <Tabs
              defaultActiveKey='delivery'
              activeKey={step}
              onSelect={(k) => nextStep(k)}
              id='tabs-checkout'
            >
              <Tab
                eventKey='delivery'
                title={
                  deliveryType ? (
                    <span>
                      Details <i className='fas fa-check text-success'></i>
                    </span>
                  ) : (
                    <span>Details</span>
                  )
                }
              >
                <Delivery nextStep={nextStep} />
              </Tab>
              {deliveryType === 'shipping' ? (
                <Tab
                  eventKey='shipping'
                  title={
                    shippingAddress ? (
                      <span>
                        Address <i className='fas fa-check text-success'></i>
                      </span>
                    ) : (
                      <span>Address</span>
                    )
                  }
                >
                  <Shipping nextStep={nextStep} />
                </Tab>
              ) : null}
              <Tab eventKey='payment' title='Payment Method'>
                <Payment nextStep={nextStep} />
              </Tab>
            </Tabs>

            {/* <Button variant='primary' className='d-block ml-auto mr-0'>
              Finish
            </Button> */}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CheckoutView
