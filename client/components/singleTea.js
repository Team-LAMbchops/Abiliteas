import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTea} from '../store/teas'
import {addToCart, fetchCreateOP} from '../store/cart'
import CartContainer from './cart'
import {fetchCreateOrder} from '../store/orders'
class SingleTea extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.teaId
    this.props.getSingleTea(id)
  }
  async createOrder() {
    const currentTea = this.props.singleTea
    const teaId = currentTea.id
    const qty = this.props.cart.qty[teaId]
    if (this.props.cart.items.length === 0) {
      if (this.props.user) {
        const userId = this.props.user.id
        await this.props.createOrder(userId)
      } else {
        await this.props.createOrder()
      }
    }
    const orderId = this.props.order.currentOrder.id
    await this.props.createOP(qty, orderId, teaId)
  }

  render() {
    const tea = this.props.singleTea
    return (
      <div>
        <h1>{tea.name}</h1>
        <h3>{tea.flavor}</h3>
        <img src={tea.imageUrl} width={200} height={200} mode="fit" />
        <p>Description: {tea.description}</p>
        <p>Price: ${tea.price}</p>
        <button
          type="submit"
          onClick={() => {
            this.createOrder()
            this.props.addToCart(tea)
          }}
        >
          Add To Cart
        </button>
        <div>
          <CartContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleTea: state.teas.singleTea,
    user: state.user,
    cart: state.cart,
    order: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleTea: id => dispatch(fetchSingleTea(id)),
    addToCart: item => dispatch(addToCart(item)),
    createOrder: (orderId, userId) =>
      dispatch(fetchCreateOrder(orderId, userId)),
    createOP: (qty, orderId, teaId) => fetchCreateOP(qty, orderId, teaId)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTea)
