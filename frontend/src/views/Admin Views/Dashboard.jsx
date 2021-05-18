import React from 'react'
import { Container, Nav, Navbar, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Dashboard = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Navbar id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block'>
          <Nav className='flex-column'>
            <LinkContainer to='/dashboard/userlist'>
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/dashboard/orderslist'>
              <Nav.Link>Orders</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/dashboard/productslist'>
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>

        <main
          role='main'
          className='dashboard-main col-md-9 ml-sm-auto col-lg-10 px-md-4'
        >
          <h1 className='h2'>Admin Dashboard</h1>
          <hr></hr>
          <div className='dashboard-body'>{children}</div>
        </main>
      </Row>
    </Container>
  )
}

export default Dashboard
