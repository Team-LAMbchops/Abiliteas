import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, getUpdate, removeProduct, getTotal} from '../store/cart'
import {findPrice, findTotal} from './helperFuncs'

class Cart extends React.Component {
  async componentDidMount() {
    const userId = this.props.user.id
    await this.props.getCart(userId)
  }
  render() {
    const qty = this.props.cart.qty
    const orderId = this.props.cart.currentOrderId
    const items = this.props.cart.items
    return (
      <div>
        <div className="shopping-cart">
          <header id="center">
            <img src="/pagelogo.png" width={150} />
          </header>
          <div className="title">Shopping Cart</div>
          {!items.length ? (
            <div className="ending">Your cart is empty!</div>
          ) : (
            <div>
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <div className="item">
                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() => {
                          this.props.remove(orderId, item.id)
                        }}
                      >
                        ✖
                      </button>
                      <h3>{item.name}</h3>
                      <div className="image">
                        <img
                          src={item.imageUrl}
                          width={100}
                          height={100}
                          mode="fit"
                        />
                      </div>
                      <div className="quantity">
                        <button
                          type="button"
                          className="minus-btn"
                          onClick={() =>
                            this.props.update(item.id, orderId, 'increment')
                          }
                        >
                          +
                        </button>
                        Qty: {qty[item.id]}
                        <button
                          className="plus-btn"
                          type="button"
                          onClick={() =>
                            this.props.update(item.id, orderId, 'decrement')
                          }
                        >
                          -
                        </button>
                      </div>
                      <p>
                        Price: ${(findPrice(item.price) * qty[item.id]).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div className="ending">
                <div className="subtotal">
                  <h3>Subtotal:${findTotal(items, qty).toFixed(2)}</h3>
                </div>
                <div className="checkout">
                  <button
                    className="checkoutbutton"
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
              </div>
            </div>
          )}
        </div>
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
