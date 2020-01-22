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
  currentOrderId: null,
  items: [],
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

export const removeItem = teaId => ({
  type: REMOVE_ITEM,
  teaId
})

export const getTotal = totalPrice => ({
  type: GET_TOTAL,
  totalPrice
})
export const emptyCart = () => ({
  type: EMPTY_CART
})

/**
 * THUNK CREATORS
 */
//get the cart when you click on the cart component
export const fetchCart = userId => async dispatch => {
  try {
    //if guest
    if (!userId) {
      dispatch(getCart(null))
    } else {
      const res = await axios.get(`/api/orders/cart/${userId}/`)
      dispatch(getCart(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

//get the cart or create the cart when you click add to cart
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
      //if guest
      if (!action.cartData) {
        return state
      } else {
        const newState = {...state}
        const orderProducts = action.cartData.orderProducts
        //map through the OP array and set qtys on newState qty obj.
        orderProducts.forEach(orderProduct => {
          if (!newState.qty[orderProduct.teaId]) {
            newState.qty[orderProduct.teaId] = orderProduct.quantity
          }
        })
        return {
          ...newState,
          currentOrderId: action.cartData.cart.id,
          items: action.cartData.cart.teas
        }
      }
    }
    //note: this action.type is just to keep the redux store updated without having to getCart
    case ADD_TO_CART: {
      const teaId = action.item.id
      const newState = {...state}
      if (!newState.qty[teaId]) {
        return {
          ...newState,
          currentOrderId: action.order.id,
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
          currentOrderId: action.order.id,
          qty: {
            ...newState.qty,
            [teaId]: increment
          }
        }
      }
    }

    case UPDATE_QTY: {
      //if quantity is 0, delete the instance in our qty obj.
      if (action.qtyData.quantity === 0) {
        const newState = {...state}
        delete newState.qty[action.qtyData.teaId]
        return {
          ...newState,
          //return the state with the new qty obj and a filtered items arr that no long has that specific item.
          items: state.items.filter(items => items.id !== action.qtyData.teaId),
          qty: newState.qty
        }
      } else
        //otherwise, return the new quantity from the db.
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
      //return the new qty an the filtered items.
      return {
        ...newState,
        items: state.items.filter(item => item.id !== action.teaId),
        qty: newQty
      }
    }
    case GET_TOTAL: {
      return {
        ...state,
        total: action.totalPrice
      }
    }
    case EMPTY_CART: {
      return initialCart
    }

    default:
      return state
  }
}

export default cartReducer
