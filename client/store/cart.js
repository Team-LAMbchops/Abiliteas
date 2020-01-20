/* eslint-disable max-statements */
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const initialCart = {
  currentOrder: {},
  items: [],
  qty: {}
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

export const incrementQty = qtyData => ({
  type: INCREMENT_QTY,
  qtyData
})

export const decrementQty = id => ({
  type: DECREMENT_QTY,
  id
})

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id
})

/**
 * THUNK CREATORS
 */
export const fetchCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}/${id}`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCreateOrder = (userId, tea) => async dispatch => {
  try {
    const res = await axios.post(`/api/orders`, {userId, tea})
    if (Array.isArray(res.data)) {
      dispatch(addToCart(res.data[0], tea))
    } else {
      dispatch(addToCart(res.data, tea))
    }
  } catch (error) {
    console.log(error)
  }
}
export const getIncrement = (TeaId, OrderId, type) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/${OrderId}/${TeaId}`, {
      TeaId,
      OrderId,
      type
    })
    dispatch(incrementQty(res.data))
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
      const teas = action.cartData.cart.teas
      const orderProducts = action.cartData.orderProducts
      teas.forEach(tea => {
        if (stateCopy.items.filter(item => item.id === tea.id).length === 0) {
          stateCopy.items.push(tea)
        }
      })
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
          items: [...newState.items, action.item],
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
    case INCREMENT_QTY: {
      if (action.qtyData.quantity === 0) {
        const newState = {...state}
        const newItems = newState.items.filter(
          item => item.id !== action.qtyData.teaId
        )
        delete newState.qty[action.qtyData.teaId]
        return {
          ...newState,
          items: newItems,
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
