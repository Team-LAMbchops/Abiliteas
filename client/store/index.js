import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import usersReducer from './user'
import teasReducer from './teas'
import cartReducer from './cart'
import ordersReducer from './orders'
import adminReducer from './admin'

const RESET_APP = 'RESET_APP'

export const resetApp = () => ({
  type: RESET_APP
})

const reducer = combineReducers({
  user: usersReducer,
  teas: teasReducer,
  cart: cartReducer,
  orders: ordersReducer,
  admin: adminReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined
  }
  return reducer(state, action)
}
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
