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
    const items = this.props.cart.items
    return (
      <div>
        <h1>Checkout</h1>
        <h2>Order Summary:</h2>
        <div>
          <div>
            {items.map(item => {
              return (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <img
                    src={item.imageUrl}
                    width={100}
                    height={100}
                    mode="fit"
                  />
                  <p>Quantity: {qty[item.id]}</p>
                </div>
              )
            })}
          </div>
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
    getSingleCart: id => dispatch(fetchCart(id))
  }
}

const checkoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutPage
)

export default checkoutPageContainer
