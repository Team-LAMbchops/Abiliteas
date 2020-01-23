import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteSingleUser} from '../../store/admin'
import {Link} from 'react-router-dom'

class AdminAllUsers extends React.Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const users = this.props.users

    return (
      <div>
        <h1>Admin All Users</h1>
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>
        {users.map(user => {
          return (
            <div key={user.id}>
              <h3>
                <Link to={`/admin/users/${user.id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </h3>
              <p>{user.email}</p>
              <p>{user.address}</p>
              <div>
                <Link to={`/admin/editUser/${user.id}`}>
                  <button type="button">Edit User</button>
                </Link>
                <button
                  type="button"
                  onClick={() => this.props.removeSingleUser(user.id)}
                >
                  Remove User from Database
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.admin.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(fetchUsers()),

    removeSingleUser: userId => dispatch(deleteSingleUser(userId))
  }
}

const adminAllUsersContainer = connect(mapStateToProps, mapDispatchToProps)(
  AdminAllUsers
)

export default adminAllUsersContainer
