import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

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

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
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
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    default:
      return state
  }
}

export default cartReducer
