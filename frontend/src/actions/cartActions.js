import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_SAVE_DELIVERY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, qty, vegan, gfree) => async (
  dispatch,
  getState
) => {
  //get data from api about specific product
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      inStock: data.inStock,
      qty: qty,
      vegan: vegan,
      gfree: gfree,
    },
  })
  // localstorage only accepts string, so stringify, and when I nedd it, json.parse()
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', data)
}

export const saveDelivery = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_DELIVERY,
    payload: data,
  })

  localStorage.setItem('delivery', data)
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
