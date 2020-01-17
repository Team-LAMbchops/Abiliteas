import React from 'react'
import {connect} from 'react-redux'
import AllOrders from './allOrders'

class UserProfile extends React.Component {
  componentDidMount() {}

  render() {
    let user = this.props.user

    return (
      <div>
        <div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <div>{user.email}</div>
          <div>{user.address}</div>
        </div>

        <div>
          <AllOrders />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
