import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'

/**
 * INITIAL STATE
 */
const cart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

export const getCartProducts = () => ({
  type: GET_CART_PRODUCTS
})
//Hello

/**
 * THUNK CREATORS
 */
export const fetchCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
function cartReducer(state = cart, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS: {
      return state
    }
    case GET_CART:
      return action.cart
    case ADD_TO_CART: {
      if (state[action.item]) {
        let newState = {...state}
        newState[action.item]++
        return newState
      } else {
        let newState = {...state}
        newState[action.item] = 1
        return newState
      }
    }

    default:
      return state
  }
}

export default cartReducer
