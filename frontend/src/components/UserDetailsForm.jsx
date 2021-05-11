import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const UserDetailsForm = () => {
  const [name, setName] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    window.alert('ok')
  }

  return (
    <Form onSubmit={submitHandler}>
      <p>Please complete the details for the receipt: </p>

      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Enter name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='lname'>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type='lname'
          placeholder='Enter last name'
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' className='mt-4'>
        Next
      </Button>
    </Form>
  )
}

export default UserDetailsForm
