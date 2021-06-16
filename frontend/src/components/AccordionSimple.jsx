import React, { useState } from 'react'

const AccordionSimple = ({ children, title }) => {
  const [show, setShow] = useState(false)

  return (
    <p>
      <strong>{title}</strong>
      {show ? (
        <i
          onClick={() => setShow(false)}
          className='mx-2 fas fa-chevron-circle-up'
        ></i>
      ) : (
        <i
          onClick={() => setShow(true)}
          className='mx-2 fas fa-chevron-circle-down'
        ></i>
      )}
      {show && children}
    </p>
  )
}

export default AccordionSimple
