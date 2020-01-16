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
const initialCart = {
  items: [],
  qty: {}
}

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
function cartReducer(state = initialCart, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS: {
      return state
    }
    case GET_CART:
      return action.cart
    case ADD_TO_CART: {
      let teaId = action.item.id
      if (!state.qty[teaId]) {
        return {
          ...state,
          qty: {
            ...state.qty,
            [teaId]: 1
          },
          items: [...state.items, action.item]
        }
      } else {
        let increment = state.qty[teaId] + 1
        return {
          ...state,
          qty: {
            ...state.qty,
            [teaId]: increment
          }
        }
      }
    }
    default:
      return state
  }
}

export default cartReducer
