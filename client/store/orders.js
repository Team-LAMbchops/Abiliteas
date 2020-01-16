import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'

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

const createOrder = order => ({
  type: CREATE_ORDER,
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

export const fetchSingleOrder = (userId, orderId) => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}/${orderId}`)
    dispatch(getSingleOrder(res.data), {userId})
  } catch (err) {
    console.log(err)
  }
}

export const fetchCreateOrder = (userId = null) => async dispatch => {
  try {
    const res = await axios.post(`/api/orders`, {userId})
    dispatch(createOrder(res.data))
  } catch (error) {
    console.log(error)
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
    case CREATE_ORDER: {
      return {
        ...state,
        allOrders: [...state.allOrders, action.order]
      }
    }
    default:
      return state
  }
}

export default ordersReducer
