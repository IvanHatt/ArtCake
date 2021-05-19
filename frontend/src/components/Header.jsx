import React from 'react'
// import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Dropdown,
} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { LinkContainer } from 'react-router-bootstrap'
import { HashLink } from 'react-router-hash-link'
import { logout } from '../actions/userActions.js'
import logo from '../images/logoArtCake.png'
import CartItems from './CartItems.jsx'
// import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header style={{ height: '15vh' }}>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src={logo} className='logo'></Image>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className='m-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <HashLink to='/#about' className='nav-link'>
                About
              </HashLink>
              <LinkContainer to='/contact'>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/shop'>
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/dashboard/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/dashboard/orderslist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/dashboard/productslist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <Nav className='ml-auto'>
              <NavDropdown
                drop='left'
                title={<i className='fas fa-shopping-cart'></i>}
                id='cart'
                className='cart-dropdown'
              >
                <CartItems title='My Items' edit small />
                {cartItems.length > 0 && (
                  <Dropdown.Item
                    as='div'
                    className='w-100 d-flex justify-content-between'
                  >
                    <LinkContainer to='/cart' activeClassName='outline'>
                      <Button variant='outline-primary' size='sm'>
                        To my Cart
                      </Button>
                    </LinkContainer>
                    <LinkContainer
                      to={userInfo ? '/checkout' : '/login?redirect=checkout'}
                    >
                      <Button variant='primary' size='sm'>
                        {userInfo ? 'Checkout' : 'SignIn and Checkout'}
                      </Button>
                    </LinkContainer>
                  </Dropdown.Item>
                )}
              </NavDropdown>
              {userInfo ? (
                <NavDropdown
                  title={<i className='fas fa-user'></i>}
                  id='username'
                  className='cart-dropdown menu-narrow'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <h2 className='text-center mb-0'>
                        {' '}
                        Welcome {userInfo.name} !
                      </h2>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <div className='user-details'>
                    <span>
                      <strong>Email: </strong> {userInfo.email}
                    </span>
                    <span>
                      <strong>Shipping Address: </strong>
                      {userInfo.shippingAddress ?? 'None'}
                    </span>
                  </div>
                  <NavDropdown.Divider />
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={logoutHandler}
                    className='float-right mt-2'
                  >
                    Logout
                  </Button>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='empty-button'>Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
