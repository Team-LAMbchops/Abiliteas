import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import {Link} from 'react-router-dom'
import {findPrice} from './helperFuncs'

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
          <div>
            {orders.map(order => {
              return (
                <div key={order.id} id="orderHistorySingleOrder">
                  <div>
                    <Link
                      to={`/orders/${this.props.userId}/${order.id}`}
                      id="orderHistoryTitle"
                    >
                      <span>ORDER-DATE: {order.date.substring(0, 10)} </span>
                      <span>STATUS: {order.status} </span>
                    </Link>
                  </div>

                  {!order.teas ? (
                    <div>No Items Ordered in this Purchase</div>
                  ) : (
                    <div>
                      {order.teas.map(tea => {
                        return (
                          <div key={tea.id} id="singleProductHistory">
                            <div id="orderHistoryTeaInfo">
                              <div id="singleTeaNameOrderPage">{tea.name}</div>
                              <div id="singleTeaFlavorOrderPage">
                                {tea.flavor}
                              </div>
                              <div id="singleTeaQuantityPriceOrderPage">
                                $ {findPrice(tea.price).toFixed(2)}
                              </div>
                              <div id="singleTeaQuantityPriceOrderPage">
                                QUANTITY: {tea.order_product.quantity}
                              </div>
                            </div>

                            <div id="orderHistoryTeaPic">
                              <img
                                src={tea.imageUrl}
                                width={200}
                                height={200}
                                mode="fit"
                              />
                            </div>
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
