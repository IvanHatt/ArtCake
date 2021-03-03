import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(
    `Listening at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
      .yellow.bold
  )
})
