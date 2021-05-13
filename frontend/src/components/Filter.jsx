import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { setFilter } from '../actions/filterActions'

const Filter = () => {
  const [veganOption, setVeganOption] = useState(false)
  const [gfreeOption, setGfreeOption] = useState(false)
  const [price, setPrice] = useState('500')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFilter(veganOption, gfreeOption, price))
  }, [dispatch, veganOption, gfreeOption, price])

  return (
    <div className='card-container'>
      <h3 className='text-center'>Filter</h3>
      <Form>
        <Form.Group>
          <Form.Check
            type='checkbox'
            label='Gluten Free Option'
            value={gfreeOption}
            onChange={() => setGfreeOption(!gfreeOption)}
          ></Form.Check>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type='checkbox'
            label='Vegan Option'
            value={veganOption}
            onChange={() => setVeganOption(!veganOption)}
          ></Form.Check>
        </Form.Group>
        <Form.Group controlId='Range'>
          <Form.Label>Price up to {price} ILS</Form.Label>
          <Form.Control
            type='range'
            value={price}
            max='500'
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default Filter
