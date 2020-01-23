import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/orders'
import {findPrice} from './helperFuncs'

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
      <div id="singleOrderPage">
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>

        <div />
        {!singleOrder.date ? (
          <div>Single Order - Loading</div>
        ) : (
          <div>
            {singleOrder.teas.map(tea => {
              return (
                <div key={tea.id} id="singleProductHistory">
                  <div id="orderHistoryTeaInfo">
                    <div id="singleTeaNameOrderPage">{tea.name}</div>
                    <div id="singleTeaFlavorOrderPage">{tea.flavor}</div>
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
