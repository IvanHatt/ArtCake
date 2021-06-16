import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import OrdersList from '../components/OrdersList'
import AccordionSimple from '../components/AccordionSimple'

const ProfileView = ({ location, history }) => {
  const [updemail, setUpdemail] = useState(false)
  const [updpassword, setUpdpassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        // passing profile will lead to: /api/users/profile as defined in action creator
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }
      if (success) {
        setUpdemail(false)
        setUpdpassword(false)
      } else {
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  //same handler for email and password
  const updateHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, email, password }))
    }
  }

  return (
    <Container>
      <div className='card-container '>
        <h1>My Profile</h1>
        <hr></hr>
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'> Updated!</Message>}
        {loading && <Loader />}
        <p>
          <strong>Name: </strong> {user.name}
        </p>
        <p>
          <strong>Email: </strong> {user.email}
          <Button
            className='mx-3'
            type='button'
            size='sm'
            variant='primary'
            onClick={() => setUpdemail(true)}
          >
            <i className='fas fa-edit'></i>
          </Button>
        </p>
        <Modal show={updemail} backdrop='static' keyboard={false}>
          <Modal.Body>
            <Form onSubmit={updateHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Update Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button size='sm' onClick={() => setUpdemail(false)}>
                <i className='fas fa-times'></i>
              </Button>
              <Button size='sm' type='submit'>
                <i className='fas fa-check'></i>
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <p>
          <strong>Phone: </strong> 0544444444
        </p>
        <p>
          <strong>Change Password </strong>
          <Button
            className='mx-3'
            size='sm'
            onClick={() => setUpdpassword(true)}
          >
            <i className='fas fa-edit'></i>
          </Button>
        </p>
        <Modal
          show={updpassword}
          onHide={() => setUpdpassword(false)}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Body>
            <Form onSubmit={updateHandler}>
              <Form.Group controlId='password'>
                <Form.Label>Update Password </Form.Label>
                <Form.Control
                  minLength='6'
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setMessage(false)
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Update Password</Form.Label>
                <Form.Control
                  minLength='6'
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setMessage(false)
                  }}
                ></Form.Control>
              </Form.Group>
              <Button size='sm' onClick={() => setUpdpassword(false)}>
                <i className='fas fa-times'> </i>
              </Button>
              <Button size='sm' type='submit'>
                <i className='fas fa-check'></i>
              </Button>
            </Form>
            {message && <Message variant='danger'>{message}</Message>}
          </Modal.Body>
        </Modal>
        <AccordionSimple title='My orders'>
          <OrdersList />
        </AccordionSimple>
        <AccordionSimple title='My Reviews'></AccordionSimple>
      </div>
    </Container>
  )
}

export default ProfileView
