import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, getCartProducts} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    // const id = this.props.match.params.userId
    // this.props.getCart(id)
    this.props.getCartProducts()
    console.log(this.props)
  }
  render() {
    // const cart = this.props.cart
    // console.log(cart, 'THIS IS THE CART')
    const cart = this.props.cart
    console.log(cart, 'THIS IS THE CART')
    return (
      <div>
        <div>
          <h1>Shopping Cart</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // cart: state.cart.cart.teas
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id)),
    getCartProducts: () => dispatch(getCartProducts())
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
