import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from 'react-bootstrap'

const AccordionSimple = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false)

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header initial={false} onClick={() => setExpanded(!expanded)}>
        <p>
          <strong>{title}</strong>{' '}
          {expanded ? (
            <Button
              size='sm'
              className='p-0 bg-transparent border-0'
              type='button'
              variant='light'
            >
              <i className='fas fa-chevron-circle-up'></i>
            </Button>
          ) : (
            <Button
              size='sm'
              className='p-0 bg-transparent border-0'
              type='button'
              variant='light'
            >
              <i className='fas fa-chevron-circle-down'></i>
            </Button>
          )}
        </p>
      </motion.header>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export default AccordionSimple
