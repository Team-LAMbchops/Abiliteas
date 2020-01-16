import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'

class AllOrders extends React.Component {
  componentDidMount() {
    console.log()
    this.props.getAllOrders(this.props.userId)
  }

  render() {
    const orders = this.props.orders
    return (
      <div>
        <h1>ALL ORDERS FOR SINGLE USER!</h1>
        {orders.map(order => {
          return (
            <div key={order.id}>
              {order.teas.map(tea => {
                return (
                  <div key={tea.id}>
                    <h3>{tea.name}</h3>
                    <span>
                      {tea.flavor} {tea.price} {tea.order_product.quantity}
                    </span>
                    <img
                      src={tea.imageUrl}
                      width={200}
                      height={200}
                      mode="fit"
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.allOrders,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: userId => dispatch(fetchOrders(userId))
  }
}

const allOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllOrders
)

export default allOrdersContainer
