import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/orders'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.getSingleOrder(
      this.props.userId,
      this.props.match.params.orderId
    )
  }

  render() {
    const singleOrder = this.props.singleOrder
    return (
      <div>
        <h1>Single Order Page</h1>
        <div />
        {!singleOrder.date ? (
          <div>Single Order - Loading</div>
        ) : (
          <div>
            <h1>
              {singleOrder.id} {singleOrder.date.slice(0, 10)}
            </h1>

            {singleOrder.teas.map(tea => {
              return (
                <div key={tea.id}>
                  <h3>{tea.name}</h3>
                  <span>
                    {tea.flavor} {tea.price} {tea.order_product.quantity}
                  </span>
                  <img src={tea.imageUrl} width={200} height={200} mode="fit" />
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
    singleOrder: state.orders.singleOrder,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleOrder: (userId, orderId) =>
      dispatch(fetchSingleOrder(userId, orderId))
  }
}

const singleOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleOrder
)

export default singleOrdersContainer
