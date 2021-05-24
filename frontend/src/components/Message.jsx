import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, ...props }) => {
  return (
    <Alert className={`mx-auto ${props.display}`} variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
