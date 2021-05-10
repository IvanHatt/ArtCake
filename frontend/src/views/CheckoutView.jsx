import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Tabs, Tab } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import * as QueryString from 'query-string'
import CartItems from '../components/CartItems'
import Delivery from '../components/Delivery'
import UserDetailsForm from '../components/UserDetailsForm'
import Shipping from '../components/Shipping'

const CheckoutView = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin)

  const deliveryType = useSelector((state) => state.cart.delivery)

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
    history.push(`checkout?step=${step}`)
  }

  return (
    <div className='container'>
      <Row>
        <Col md={4}>
          <div className='card-container'>
            <CartItems title='My Order' small></CartItems>
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
              <Tab eventKey='delivery' title='Delivery'>
                <Delivery nextStep={nextStep} />
              </Tab>
              {deliveryType === 'shipping' ? (
                <Tab eventKey='shipping' title='Address'>
                  <Shipping nextStep={nextStep} />
                </Tab>
              ) : null}
              <Tab eventKey='details' title='Details'>
                <UserDetailsForm />
              </Tab>
              <Tab eventKey='payment' title='Payment'>
                <p>Payment</p>
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
