import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, incrementQty, decrementQty, removeItem} from '../store/cart'
import {findPrice, findTotal} from './helperFuncs'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id)
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
                        Increment
                      </button>
                      <button
                        type="button"
                        onClick={() => this.props.decrement(item.id)}
                      >
                        Decrement
                      </button>
                      <button
                        type="button"
                        onClick={() => this.props.remove(item.id)}
                      >
                        Remove
                      </button>
                    </p>

                    <p>
                      Price: ${(findPrice(item.price) * qty[item.id]).toFixed(
                        2
                      )}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
          Total:${findTotal(items, qty).toFixed(2)}
        </div>
        <button type="submit" onClick={() => this.props.redirect('/checkout')}>
          Checkout
        </button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCart: id => dispatch(fetchCart(id)),
    increment: id => dispatch(incrementQty(id)),
    decrement: id => dispatch(decrementQty(id)),
    remove: id => dispatch(removeItem(id)),
    redirect: route => ownProps.history.push(route)
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
