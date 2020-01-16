import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTea} from '../store/teas'
import {addToCart} from '../store/cart'
import CartContainer from './cart'
import {fetchCreateOrder} from '../store/orders'
class SingleTea extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.teaId
    this.props.getSingleTea(id)
  }
  handleSubmit() {
    if (this.props.cart.items.length === 0) {
      if (this.props.user) {
        const userId = this.props.user.id
        this.props.createOrder(userId)
      } else {
        this.props.createOrder()
      }
    }
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
            this.props.addToCart(tea)
            this.handleSubmit()
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
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleTea: id => dispatch(fetchSingleTea(id)),
    addToCart: item => dispatch(addToCart(item)),
    createOrder: (orderId, userId) =>
      dispatch(fetchCreateOrder(orderId, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTea)
