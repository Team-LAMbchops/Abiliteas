import React from 'react'
import {connect} from 'react-redux'
import {emptyCart} from '../store/cart'

class ConfirmationPage extends React.Component {
  async componentDidMount() {
    await this.props.emptyCart()
  }
  render() {
    return (
      <div>
        <h1>Thank you for your order!</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: () => dispatch(emptyCart())
  }
}

const ConfirmationContainer = connect(mapStateToProps, mapDispatchToProps)(
  ConfirmationPage
)

export default ConfirmationContainer
