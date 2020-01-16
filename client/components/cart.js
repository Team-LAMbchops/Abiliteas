import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, getCartProducts, Increment, Decrement} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartProducts()
  }
  render() {
    const items = this.props.cart.items
    const qty = this.props.cart.qty
    return (
      <div>
        <div>
          <h1>Shopping Cart</h1>
          {!items.length ? (
            <div>Your cart is empty!</div>
          ) : (
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
                    <p>
                      Quantity: {qty[item.id]}
                      <button
                        type="button"
                        onClick={() => this.props.increment(item.id)}
                      >
                        INCREMENT
                      </button>
                      <button
                        type="button"
                        onClick={() => this.props.decrement(item.id)}
                      >
                        DECREMENT
                      </button>
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
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
    getCartProducts: () => dispatch(getCartProducts()),
    increment: id => dispatch(Increment(id)),
    decrement: id => dispatch(Decrement(id))
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
