import React from 'react'
import {connect} from 'react-redux'
import ShippingAddressForm from './shippingAddressForm'
import {fetchCart} from '../store/cart'
import {getCartProducts} from '../components/cart'
import MyStoreCheckout from '../payment-components/MyStoreCheckout'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getCart(id)
  }

  render() {
    const items = this.props.cart.items
    const qty = this.props.cart.qty
    return (
      <div>
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
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: () => dispatch(fetchCart())
    //add an order?
  }
}

const checkoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutPage
)

export default checkoutPageContainer
