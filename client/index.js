import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Elements, StripeProvider} from 'react-stripe-elements'
import MyStoreCheckout from './payment-components/MyStoreCheckout'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import CheckoutForm from './payment-components/CheckoutForm'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_1hdFyJShTYiEWY1Ghll0cD3v00gkr3nzIx">
      <Router history={history}>
        <App />
        {/* <Elements>
      <CheckoutForm />
      </Elements> */}
      </Router>
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
)
