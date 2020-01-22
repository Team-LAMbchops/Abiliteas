import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

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

const updateOrder = updatedOrder => ({
  type: UPDATE_ORDER,
  updatedOrder
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
    const res = await axios.get(`/api/orders/singleOrder/${userId}/${orderId}`)
    dispatch(getSingleOrder(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const editOrder = (orderId, editedOrder) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${orderId}`, editedOrder)
    console.log('information from UPDATE ORDER data', data)
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
    case GET_SINGLE_ORDER:
      return {...state, singleOrder: action.order}
    case UPDATE_ORDER:
      return {
        allOrders: [
          ...state.allOrders.filter(
            orderObject => orderObject.id !== action.updatedOrder.id
          ),
          action.updatedOrder
        ],
        singleOrder: {}
      }
    default:
      return state
  }
}

export default ordersReducer
