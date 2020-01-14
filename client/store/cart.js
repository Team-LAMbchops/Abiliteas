import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: [],
  newItem: {}
}

/**
 * ACTION CREATORS
 */
const getCartProducts = cartProducts => ({
  type: GET_CART,
  cartProducts
})

/**
 * THUNK CREATORS
 */
export const fetchCartProducts = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getCartProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cartProducts}
    default:
      return state
  }
}

export default cartReducer
