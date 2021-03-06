import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const GET_USERS = 'GET_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  allOrders: [],
  singleOrder: {},
  allUsers: [],
  singleUser: {}
}

/**
 * ACTION CREATORS
 */

//Orders
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

//Users
const getUsers = users => ({
  type: GET_USERS,
  users
})

const getSingleUser = user => ({
  type: GET_SINGLE_USER,
  user
})

const updateSingleUser = updatedUser => ({
  type: UPDATE_SINGLE_USER,
  updatedUser
})

const deleteUser = deletedUser => ({
  type: DELETE_USER,
  deletedUser
})
/**
 * THUNK CREATORS
 */
//Orders
export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/`)
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleOrder = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${orderId}`)
    dispatch(getSingleOrder(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const editOrder = (orderId, editedOrder) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${orderId}`, editedOrder)
    dispatch(updateOrder(data))
  } catch (error) {
    console.log(error)
  }
}

//Users
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/`)
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}`)
    dispatch(getSingleUser(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const editSingleUser = (userId, editedUser) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}`, editedUser)
    dispatch(updateSingleUser(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteSingleUser = userId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/users/${userId}`)
    dispatch(deleteUser(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, allOrders: action.orders}
    case GET_SINGLE_ORDER:
      return {...state, singleOrder: action.order}
    case UPDATE_ORDER:
      return {
        ...state,
        allOrders: [
          ...state.allOrders.filter(
            orderObject => orderObject.id !== action.updatedOrder.id
          ),
          action.updatedOrder
        ],
        singleOrder: {}
      }
    case GET_USERS:
      return {...state, allUsers: action.users}
    case GET_SINGLE_USER:
      return {...state, singleUser: action.user}
    case UPDATE_SINGLE_USER:
      return {
        ...state,
        allUsers: [
          ...state.allUsers.filter(
            userObject => userObject.id !== action.updatedUser.id
          ),
          action.updatedUser
        ],
        singleUser: {}
      }
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(
          userObject => userObject.id !== action.deletedUser.id
        ),
        singleUser: {}
      }
    default:
      return state
  }
}

export default adminReducer
