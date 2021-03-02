const express = require('express')
const products = require('./data/products')

const app = express()
const PORT = 3111

app.get('/', (req, res) => {
  res.send('API is running ')
})

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id)
  res.json(product)
})

app.listen(PORT, () => {
  console.log('Listening at http://localhost:' + PORT)
})
