import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/admin'
import {Link} from 'react-router-dom'

class AdminAllOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    const orders = this.props.users
    return (
      <div>
        <h1>Admin All Users</h1>

        {orders.map(order => {
          return (
            <div key={order.id}>
              <h3>
                <Link to={`/admin/orders/${order.id}`}>{order.date}</Link>
              </h3>
              <p>{order.status}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.admin.allOrders,
    singleOrder: state.admin.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: () => dispatch(fetchOrders())
  }
}

const adminAllOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(
  AdminAllOrders
)

export default adminAllOrdersContainer
