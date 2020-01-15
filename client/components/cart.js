import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getCart(id)
  }
  render() {
    const cart = this.props.cart
    console.log(cart, 'THIS IS THE CART')
    return (
      <div>
        <h1>Shopping Cart</h1>
        {this.props.cart ? (
          <div>
            {cart.map(item => {
              return (
                <div key={item.id}>
                  <img
                    src={item.imageUrl}
                    width={100}
                    height={100}
                    mode="fit"
                  />
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.cart_product.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart.teas
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id))
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
