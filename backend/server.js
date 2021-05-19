import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

//make upload files available at frontend by making it static
// im using here es6 imports, instead of js require()... so __dirname will not be available
// that's why I create a var called __dirname and set it to path.resolve()

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//sandbox paypal (fake) when I need the client_id, i call this endpoint
// i dont want to store the id in front end
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT ? process.env.PORT : '5000'

app.listen(PORT, () => {
  console.log(
    `Listening at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
      .yellow.bold
  )
})
