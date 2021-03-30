import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products or what was passed as query in the search
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  /// pagination functionality
  //items per page
  const pageSize = 4
  // page number passed as a query string host/pageNumber=2
  const page = Number(req.query.pageNumber) || 1

  //search functionality
  //req.query catches the list?q=keyword part
  //if a query was passed, coming from search, then use regex (so "iph" will get also "Iphone" and so on)
  // if not, pass an empty object and get all the items
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  // mongoose counts number of items
  const count = await Product.countDocuments({ ...keyword })

  //mongoose limit (only displays certain amount of items) and skip (skip amount of items, zB if page 3, then skip 10*2, all the 20 in previous pages)
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  //return the items, page number, and number of total pages (all the items divided by the number shown in each page)
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    /// promedio de todos los reviews (suma dividido el numero de reviews)
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// *** admin functionalities ****

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    description: 'Sample description',
    allergens: 'Sample allergens',
    dimensions: 'Sample dimensions',
    servings: 'Sample servings',
    colors: 'Sample colors',
    veganOpt: true,
    glutenFreeOpt: true,
    inStock: true,
    rating: 0,
    numReviews: 0,
    price: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    allergens,
    dimensions,
    servings,
    colors,
    veganOpt,
    glutenFreeOpt,
    name,
    price,
    description,
    image,
    category,
    inStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.category = category
    product.inStock = inStock
    product.allergens = allergens
    product.dimensions = dimensions
    product.servings = servings
    product.colors = colors
    product.veganOpt = veganOpt
    product.glutenFreeOpt = glutenFreeOpt

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  createProductReview,
  deleteProduct,
  createProduct,
  updateProduct,
}
