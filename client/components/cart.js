import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, getUpdate, removeProduct, getTotal} from '../store/cart'
import {findPrice, findTotal} from './helperFuncs'
import Axios from 'axios'

class Cart extends React.Component {
  async componentDidMount() {
    const userId = this.props.user.id
    await this.props.getCart(userId)
  }
  render() {
    const qty = this.props.cart.qty
    const orderId = this.props.cart.currentOrder.id
    const items = this.props.cart.currentOrder.teas
    return (
      <div>
        <div>
          <h1>Shopping Cart</h1>
          {!items ? (
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
                        onClick={() =>
                          this.props.update(item.id, orderId, 'increment')
                        }
                      >
                        Increment
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          this.props.update(item.id, orderId, 'decrement')
                        }
                      >
                        Decrement
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await this.props.remove(orderId, item.id)
                          await this.props.getCart(this.props.user.id)
                        }}
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
              <h3>Subtotal:${findTotal(items, qty).toFixed(2)}</h3>
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={() => {
            this.props.redirect('/checkout')
            const total = findTotal(items, qty).toFixed(2)
            this.props.getTotal(total)
          }}
        >
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
    update: (TeaId, OrderId, type) => dispatch(getUpdate(TeaId, OrderId, type)),
    remove: (orderId, teaId) => dispatch(removeProduct(orderId, teaId)),
    redirect: route => ownProps.history.push(route),
    getTotal: totalPrice => dispatch(getTotal(totalPrice))
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
