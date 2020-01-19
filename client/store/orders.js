import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

/**
 * INITIAL STATE
 */
const initialState = {
  allOrders: [],
  singleOrder: {},
  currentOrder: {}
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

const updateOrder = order => ({
  type: UPDATE_ORDER,
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

export const editOrder = (orderId, editedOrder) => async dispatch => {
  try {
    await axios.put(`/api/orders/${orderId}`, editedOrder)
    const {data} = await Axios.get(`/api/orders`)
    dispatch(updateOrder(data))
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
        allOrders: [...state.allOrders, action.order],
        currentOrder: action.order
      }
    }
    case UPDATE_ORDER: {
      return {
        ...state,
        allOrders: [...state.allOrders, action.order],
        currentOrder: action.order
      }
    }
    default:
      return state
  }
}

export default ordersReducer
