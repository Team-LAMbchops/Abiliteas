import React from 'react'
import {connect} from 'react-redux'
import AllOrders from './allOrders'

class UserProfile extends React.Component {
  componentDidMount() {}

  render() {
    let user = this.props.user

    return (
      <div id="userProfilePage">
        <div id="userInformation">
          <div>
            <img src="/pagelogo.png" width={300} />
          </div>
          <div id="userPageName">
            {user.firstName} {user.lastName}
          </div>
          <div id="userPageEmail">{user.email}</div>
          <div>{user.address}</div>
        </div>

        <div id="userPageOrderHistory">
          <div />
          <div id="scrollOrders">
            {' '}
            <AllOrders />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
