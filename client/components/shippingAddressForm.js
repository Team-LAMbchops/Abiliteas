import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder, editOrder} from '../store/orders'

class ShippingAddressForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      emailAddress: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // const id = this.props.match.params.OrdersId
    // this.props.fetchSingleOrder(id)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    // this.props.onSubmitEditSingleOrder(this.props.match.params.orderId, this.state)

    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      email: ''
    })
  }

  render() {
    return (
      <div>
        <h1>1. Shipping Address </h1>

        <form onSubmit={this.handleSubmit}>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
          Address:
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
          Email Address:
          <input
            type="text"
            name="emailAddress"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Place Order
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //use singleOrder state or allOrders state?
  return {
    // currOrder: state.order.currentOrder,
    // oneOrder: state.order.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  //dispatch the thunk that updates order from 'pending' to 'completed'
  return {
    // loadSingleOrder: (userId, orderId) => dispatch(fetchSingleOrder(userId, orderId)),
    // onSubmitEditSingleOrder: (orderId, editedOrder) => dispatch(editOrder(orderId, editedOrder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressForm)
