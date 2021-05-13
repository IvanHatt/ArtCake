import { SET_PRODUCTS_FILTER } from '../constants/filterConstants'

export const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCTS_FILTER:
      return {
        veganOption: action.payload.veganOption,
        gfreeOption: action.payload.gfreeOption,
        price: action.payload.price,
      }
    default:
      return state
  }
}
