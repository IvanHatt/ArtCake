import React from 'react'
import About from '../components/About'
import Hero from '../components/Hero'
import Topten from '../components/Topten'

const HomeView = () => {
  return (
    <>
      <Hero>
        <h1>There is always room for some CAKE!</h1>
        <p>
          Nullam fermentum, lacus a bibendum venenatis, sem eros aliquet ex, at
          molestie ex orci sed metus. Fusce lobortis, tortor sed rutrum feugiat,
          sem libero vehicula erat.
        </p>
      </Hero>
      <Topten />
      <About />
    </>
  )
}

export default HomeView
