import React from 'react'
import {connect} from 'react-redux'
import {fetchCartProducts} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getCartProducts(id)
  }
  render() {
    const cart = this.props.cart
    console.log(cart, 'THIS IS OUR CART')
    return (
      <div>
        <div>
          <h1>Shopping Cart</h1>
        </div>
        {cart.map(item => {
          return (
            <div key={item.id}>
              <h3>{item.teaId}</h3>
              <p>quantity:{item.quantity}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: id => dispatch(fetchCartProducts(id))
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
