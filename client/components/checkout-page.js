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
      <div className="entirecheckout">
        <h1>Checkout</h1>
        <h2>Order Summary:</h2>
        {items.map(item => {
          return (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <img src={item.imageUrl} width={100} height={100} mode="fit" />
              Quantity: {qty[item.id]}
            </div>
          )
        })}
        <h3>Order Total: ${total}</h3>
        <div>
          <h2>Payment:</h2>
          <MyStoreCheckout />
          <div />
          <div />
        </div>
        <ShippingAddressForm />
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
