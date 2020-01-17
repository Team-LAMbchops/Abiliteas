import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
//DB PERSISTENCE
// const CREATE_ORDER_PRODUCT = 'CREATE_ORDER_PRODUCT'

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

export const incrementQty = id => ({
  type: INCREMENT_QTY,
  id
})

export const decrementQty = id => ({
  type: DECREMENT_QTY,
  id
})

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id
})

// const createOP = () => ({
//   type: CREATE_ORDER_PRODUCT,
// })
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

export const fetchCreateOP = async (qty, orderId, teaId) => {
  try {
    await axios.post('/api/orderproducts', {qty, orderId, teaId})
  } catch (error) {
    console.log(error)
  }
}
/**
 * REDUCER
 */
// eslint-disable-next-line complexity
function cartReducer(state = initialCart, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS: {
      return state
    }
    case GET_CART:
      return action.cart
    case ADD_TO_CART: {
      const teaId = action.item.id
      const newState = {...state}
      if (!newState.qty[teaId]) {
        return {
          ...newState,
          qty: {
            ...newState.qty,
            [teaId]: 1
          },
          items: [...newState.items, action.item]
        }
      } else {
        let increment = newState.qty[teaId] + 1
        return {
          ...newState,
          qty: {
            ...newState.qty,
            [teaId]: increment
          }
        }
      }
    }
    case INCREMENT_QTY: {
      const newState = {...state}
      const increment = newState.qty[action.id] + 1
      return {
        ...newState,
        qty: {
          ...newState.qty,
          [action.id]: increment
        }
      }
    }
    case DECREMENT_QTY: {
      const newState = {...state}
      if (newState.qty[action.id] === 1) {
        const newItems = newState.items.filter(item => item.id !== action.id)
        const newQty = newState.qty
        delete newQty[action.id]
        return {
          ...newState,
          items: newItems,
          qty: newQty
        }
      } else {
        const decrement = newState.qty[action.id] - 1
        return {
          ...newState,
          qty: {
            ...newState.qty,
            [action.id]: decrement
          }
        }
      }
    }
    case REMOVE_ITEM: {
      const newState = {...state}
      const newItems = newState.items.filter(item => item.id !== action.id)
      const newQty = newState.qty
      delete newQty[action.id]
      return {
        ...newState,
        items: newItems,
        qty: newQty
      }
    }
    default:
      return state
  }
}

export default cartReducer
