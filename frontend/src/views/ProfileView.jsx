import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import OrdersList from '../components/OrdersList'

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
      } else {
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
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
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'> Updated!</Message>}
        {loading && <Loader />}
        <p>
          <strong>Name: </strong> {user.name}
        </p>
        {updemail ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Update Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Button size='sm' type='submit'>
                <i className='fas fa-check'></i>
              </Button>
              <Button size='sm' onClick={() => setUpdemail(!updemail)}>
                <i className='fas fa-times'></i>
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <p>
            <strong>Email: </strong>{' '}
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <Button size='sm' onClick={() => setUpdemail(!updemail)}>
              <i className='fas fa-edit'></i>
            </Button>
          </p>
        )}
        <p>
          <strong>Phone: </strong> 0544444444
        </p>

        {updpassword ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='password'>
              <Form.Label>Update Password </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Update Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button size='sm' type='submit'>
              <i className='fas fa-check'></i>
            </Button>
            <Button size='sm' onClick={() => setUpdpassword(!updpassword)}>
              <i className='fas fa-times'></i>
            </Button>
          </Form>
        ) : (
          <p>
            <strong>Change Password </strong>
            <Button size='sm' onClick={() => setUpdpassword(!updpassword)}>
              <i className='fas fa-edit'></i>
            </Button>
          </p>
        )}

        <p id='my-reviews'>
          <strong>My Reviews </strong>
        </p>
        <p id='my-orders'>
          <strong>My orders</strong>
          <OrdersList />
        </p>
      </div>
    </Container>
  )
}

export default ProfileView
