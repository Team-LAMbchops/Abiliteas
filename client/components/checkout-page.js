import React from 'react'
import {connect} from 'react-redux'
import ShippingAddressForm from './shippingAddressForm'
import {fetchCart} from '../store/cart'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getSingleCart(id)
  }

  render() {
    const cart = this.props.cart
    console.log(cart, 'cart!!!!!')
    return (
      <div>
        <h1>Checkout</h1>
        <h2>Order Summary:</h2>
        <div>
          {cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} width={100} height={100} mode="fit" />
                <h4>{item.name}</h4>
                <p>Quantity: {item.cart_product.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            )
          })}
        </div>

        <p>ADD Cart component html here without buttons when it has items</p>
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
    getSingleCart: id => dispatch(fetchCart(id))
  }
}

const checkoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutPage
)

export default checkoutPageContainer
