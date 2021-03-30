import React from 'react'
// import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions.js'
import logo from '../images/logoArtCake.png'
import cart from '../images/cart-icon.png'
// import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact'>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/shop'>
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-auto'>
              <NavDropdown title='Cart' id='cart'>
                <NavDropdown.Item>My Cart</NavDropdown.Item>
                <LinkContainer to='/'>
                  <NavDropdown.Item>Go to my cart</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/'>
                  <NavDropdown.Item>To checkout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <Image src={cart} className='cart-icon'></Image>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='empty-button'>Sign In</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
