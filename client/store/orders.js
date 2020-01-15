import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

/**
 * INITIAL STATE
 */
const initialState = {
  allOrders: [],
  singleOrder: {}
}

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const getSingleOrder = order => ({
  type: GET_SINGLE_ORDER,
  order
})
/**
 * THUNK CREATORS
 */
export const fetchOrders = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchSingleTea = (userId, cartId) => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}/${cartId}`)
    dispatch(getSingleOrder(res.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, allOrders: action.orders}
    case GET_SINGLE_ORDER: {
      return {...state, singleOrder: action.order}
    }
    default:
      return state
  }
}

export default ordersReducer