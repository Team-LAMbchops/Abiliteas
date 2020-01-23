import React from 'react'
import {connect} from 'react-redux'
import ShippingAddressForm from './shippingAddressForm'
import {fetchCart} from '../store/cart'
import MyStoreCheckout from '../payment-components/MyStoreCheckout'

class CheckoutPage extends React.Component {
  componentDidMount() {
    const id = this.props.user.id
    this.props.getCart(id)
  }

  render() {
    const items = this.props.cart.items
    const qty = this.props.cart.qty
    const total = this.props.cart.total
    return (
      <div>
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>

        <div id="checkoutform_wrapper">
          <div id="checkoutform_left">
            <h1>Checkout</h1>
            <h2 id="ordersum">Order Summary:</h2>
            {items.map(item => {
              return (
                <div key={item.id} className="chitem">
                  <h3 className="pName">{item.name}</h3>
                  <div className="checkoutqty"> x {qty[item.id]}</div>
                </div>
              )
            })}
          </div>

          <div id="checkoutform_right">
            <div id="payment">
              <h2>Order Total: ${total}</h2>
              <h3>Payment:</h3>
              <MyStoreCheckout />
            </div>
            <div id="shipping">
              <ShippingAddressForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id))
  }
}

const checkoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutPage
)

export default checkoutPageContainer
