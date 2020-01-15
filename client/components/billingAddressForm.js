import React from 'react'
// import {connect} from 'react-redux'

export default class BillingAddressForm extends React.Component {
  //export default for now just to see the form on /billingaddress
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
        <h1>1. Billing Address</h1>

        <form onSubmit={this.handleSubmit}>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={this.handleSubmit}
            value={this.state.firstName}
          />
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={this.handleSubmit}
            value={this.state.lastName}
          />
          Address:
          <input
            type="text"
            name="address"
            onChange={this.handleSubmit}
            value={this.state.address}
          />
          Email Address:
          <input
            type="text"
            name="emailAddress"
            onChange={this.handleSubmit}
            value={this.state.email}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

//mapDispatchToProps here or in checkout page when user clicks place order - for adding shipping address to order table with the user's firstName and lastName and emailAddress persisting to User table

//connect to single order redux store? single order hasn't been created
