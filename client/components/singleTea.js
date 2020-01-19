import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTea} from '../store/teas'
import {addToCart, fetchCreateOrder} from '../store/cart'
import CartContainer from './cart'
import {findPrice} from './helperFuncs'

class SingleTea extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.teaId
    this.props.getSingleTea(id)
  }

  async handleClick() {
    const userId = this.props.user.id
    const tea = this.props.singleTea
    await this.props.createOrder(userId, tea)
  }

  render() {
    const tea = this.props.singleTea
    return (
      <div>
        <h1>{tea.name}</h1>
        <h3>{tea.flavor}</h3>
        <img src={tea.imageUrl} width={200} height={200} mode="fit" />
        <p>Description: {tea.description}</p>
        <p>Price: $ {findPrice(tea.price)}</p>
        <button
          type="submit"
          onClick={() => {
            this.handleClick()
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
    createOrder: (userId, tea) => dispatch(fetchCreateOrder(userId, tea))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTea)
