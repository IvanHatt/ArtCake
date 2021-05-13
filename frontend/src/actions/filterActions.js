import { SET_PRODUCTS_FILTER } from '../constants/filterConstants'

export const setFilter = (veganOption, gfreeOption, price) => (dispatch) => {
  dispatch({
    type: SET_PRODUCTS_FILTER,
    payload: { veganOption, gfreeOption, price },
  })
}
