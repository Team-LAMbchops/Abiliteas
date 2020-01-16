import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, getCartProducts} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    // const id = this.props.match.params.userId
    // this.props.getCart(id)
    this.props.getCartProducts()
  }
  render() {
    const items = this.props.cart.items
    const qty = this.props.cart.qty
    console.log('items arr', items)
    console.log('qty', qty)
    return (
      <div>
        <div>
          <h1>Shopping Cart</h1>
          {items.map(item => {
            return (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <img src={item.imageUrl} width={100} height={100} mode="fit" />
                <p>Quantity: {qty[item.id]}</p>
              </div>
            )
          })}
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
    getCartProducts: () => dispatch(getCartProducts())
  }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
