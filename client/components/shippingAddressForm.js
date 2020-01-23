import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
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
      this.props.currentCartId,
      this.state
    )
    this.props.history.push('/confirmation')

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
        <div className="shippingFormContainer">
          <h2> Shipping Address </h2>

          <form onSubmit={this.handleSubmit}>
            First Name:
            <input
              className="input_field"
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
            />
            Last Name:
            <input
              className="input_field"
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
            />
            Address:
            <input
              className="input_field"
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
            Email Address:
            <input
              className="input_field"
              type="text"
              name="emailAddress"
              onChange={this.handleChange}
              value={this.state.emailAddress}
            />
            <button id="input_submit" type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentCartId: state.cart.currentOrderId,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  //dispatch the thunk that updates order from 'pending' to 'completed'
  return {
    onSubmitEditSingleOrder: (orderId, editedOrder) =>
      dispatch(editOrder(orderId, editedOrder))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShippingAddressForm)
)
