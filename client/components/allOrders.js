import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import {Link} from 'react-router-dom'

class AllOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders(this.props.userId)
  }

  render() {
    const orders = this.props.orders
    return (
      <div>
        {!orders.length ? (
          <div id="orderHistoryEmpty">Your order history is empty</div>
        ) : (
          <div id="orderHistorySingleOrder">
            {orders.map(order => {
              return (
                <div key={order.id}>
                  <Link to={`/orders/${this.props.userId}/${order.id}`}>
                    order-date: {order.date.substring(0, 10)} status:{
                      order.status
                    }
                  </Link>

                  {!order.teas ? (
                    <div>No Items Ordered in this Purchase</div>
                  ) : (
                    <div>
                      {order.teas.map(tea => {
                        return (
                          <div key={tea.id}>
                            <h3>{tea.name}</h3>
                            <span>
                              {tea.flavor} {tea.price}
                              {tea.order_product.quantity}
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
                  )}
                </div>
              )
            })}
          </div>
        )}
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
