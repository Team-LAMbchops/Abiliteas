import React from 'react'
import {connect} from 'react-redux'
import {editOrder} from '../store/orders'

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

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.onSubmitEditSingleOrder(
      this.props.currentCart.id,
      this.state
    )

    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      emailAddress: ''
    })
  }

  render() {
    return (
      <div>
        <h2> Shipping Address </h2>

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
            value={this.state.emailAddress}
          />
          <button
            type="submit"
            onClick={async evt => {
              await this.handleSubmit(evt)
            }}
          >
            Place Order
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentCart: state.cart.currentOrder,
    userId: state.user.id,
    history: ownProps.history
  }
}

const mapDispatchToProps = dispatch => {
  //dispatch the thunk that updates order from 'pending' to 'completed'
  return {
    onSubmitEditSingleOrder: (orderId, editedOrder) =>
      dispatch(editOrder(orderId, editedOrder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressForm)
