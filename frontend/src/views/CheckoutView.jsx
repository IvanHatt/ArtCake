import React from 'react'
import { Button, Col, Row, Tabs, Tab } from 'react-bootstrap'

const CheckoutView = () => {
  return (
    <div className='container'>
      <Row>
        <Col md={4}>
          <div className='card-container'>
            <h2>My Cart</h2>
            <hr />
            <div style={{ minHeight: '200px' }}>Item 1</div>
            <hr />
            <h2 className='text-right'> Total: 500ILS</h2>
          </div>
        </Col>
        <Col md={8}>
          <div className='card-container'>
            <Tabs defaultActiveKey='shipping' id='uncontrolled-tab-example'>
              <Tab eventKey='shipping' title='Shipping'>
                <p style={{ minHeight: '200px' }}>Shipping info</p>
              </Tab>
              <Tab eventKey='details' title='Details'>
                <p>Details </p>
              </Tab>
              <Tab eventKey='payment' title='Payment'>
                <p>Payment</p>
              </Tab>
            </Tabs>

            <Button variant='primary' className='mx-auto'>
              Finish
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CheckoutView
