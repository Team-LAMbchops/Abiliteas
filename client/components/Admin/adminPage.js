import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AdminPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>
        <div>
          <Link to="/admin/teas">Teas</Link>
        </div>
        <div>
          <Link to="/admin/users">Users</Link>
        </div>
        <div>
          <Link to="/admin/orders">Orders</Link>
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

const adminPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  AdminPage
)

export default adminPageContainer
