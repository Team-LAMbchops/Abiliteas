import React from 'react'
import {connect} from 'react-redux'
class ConfirmationPage extends React.Component {
  componentDidMount() {
    this.props.emptyCart()
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
  return {}
}

const ConfirmationContainer = connect(mapStateToProps, mapDispatchToProps)(
  ConfirmationPage
)

export default ConfirmationContainer
