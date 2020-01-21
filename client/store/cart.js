/* eslint-disable max-statements */
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_CART = 'EMPTY_CART'
const GET_TOTAL = 'GET_TOTAL'

/**
 * INITIAL STATE
 */
const initialCart = {
  currentOrder: {},
  qty: {},
  total: 0
}

/**
 * ACTION CREATORS
 */
const getCart = cartData => ({
  type: GET_CART,
  cartData
})

export const addToCart = (order, item) => ({
  type: ADD_TO_CART,
  order,
  item
})

export const updateQty = qtyData => ({
  type: UPDATE_QTY,
  qtyData
})

export const removeItem = (teaId, newCart) => ({
  type: REMOVE_ITEM,
  teaId,
  newCart
})

export const getTotal = totalPrice => ({
  type: GET_TOTAL,
  totalPrice
})
/**
 * THUNK CREATORS
 */
//get the cart when you click on the cart component
export const fetchCart = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart/${userId}/`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

//get the cart or create the cart when you click add to cart
export const fetchCreateOrder = (userId, tea) => async dispatch => {
  try {
    if (userId) {
      const res = await axios.post(`/api/orders`, {userId, tea})
      if (Array.isArray(res.data)) {
        dispatch(addToCart(res.data[0], tea))
      } else {
        dispatch(addToCart(res.data, tea))
      }
    } else {
      dispatch(addToCart({}, tea))
    }
  } catch (error) {
    console.log(error)
  }
}
//update cart when you click increment and decrement
export const getUpdate = (TeaId, OrderId, type) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/${OrderId}/${TeaId}`, {
      TeaId,
      OrderId,
      type
    })
    dispatch(updateQty(res.data))
  } catch (error) {
    console.log(error)
  }
}

//remove product when user removes product from cart
export const removeProduct = (orderId, teaId) => async dispatch => {
  try {
    await axios.delete(`/api/products/${orderId}/${teaId}`, {
      orderId,
      teaId
    })
    dispatch(removeItem(teaId))
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
    case GET_CART: {
      const stateCopy = {...state}
      const orderProducts = action.cartData.orderProducts

      orderProducts.forEach(orderProduct => {
        if (!stateCopy.qty[orderProduct.teaId]) {
          stateCopy.qty[orderProduct.teaId] = orderProduct.quantity
        }
      })
      return {
        ...stateCopy,
        currentOrder: action.cartData.cart
      }
    }

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
          currentOrder: action.order
        }
      } else {
        let increment = newState.qty[teaId] + 1
        return {
          ...newState,
          qty: {
            ...newState.qty,
            [teaId]: increment
          },
          currentOrder: action.order
        }
      }
    }
    case UPDATE_QTY: {
      if (action.qtyData.quantity === 0) {
        const newState = {...state}
        delete newState.qty[action.qtyData.teaId]
        return {
          ...newState,
          qty: newState.qty
        }
      } else
        return {
          ...state,
          qty: {
            ...state.qty,
            [action.qtyData.teaId]: action.qtyData.quantity
          }
        }
    }
    case REMOVE_ITEM: {
      const newState = {...state}
      const newQty = newState.qty
      delete newQty[action.teaId]
      return {
        ...state,
        qty: newQty
      }
    }
    case GET_TOTAL: {
      return {
        ...state,
        total: action.totalPrice
      }
    }

    default:
      return state
  }
}

export default cartReducer
