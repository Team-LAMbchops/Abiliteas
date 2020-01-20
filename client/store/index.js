import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import usersReducer from './user'
import teasReducer from './teas'
import cartReducer from './cart'
import ordersReducer from './orders'
import adminReducer from './admin'

const reducer = combineReducers({
  user: usersReducer,
  teas: teasReducer,
  cart: cartReducer,
  orders: ordersReducer,
  admin: adminReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
