import React, { useState, useEffect } from 'react'
import './styles/counter.css'

const Counter = ({ min, max, handleQuantity }) => {
  const [count, setCount] = useState(1)

  useEffect(() => {
    handleQuantity(count)
  }, [count, handleQuantity])

  const handleIncrement = (e) => {
    e.preventDefault()
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = (e) => {
    e.preventDefault()
    setCount((prevCount) => prevCount - 1)
  }
  return (
    <div className='counter-container'>
      <button
        onClick={handleDecrement}
        className='btn-counter'
        disabled={count <= min}
      >
        <i className='fas fa-minus-circle'></i>
      </button>
      <span className='count'>{count}</span>
      <button
        onClick={handleIncrement}
        className='btn-counter'
        disabled={count >= max}
      >
        <i className='fas fa-plus-circle'></i>
      </button>
    </div>
  )
}

export default Counter
