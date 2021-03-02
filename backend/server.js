import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id)
  res.json(product)
})

app.listen(PORT, () => {
  console.log(
    `Listening at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  )
})
