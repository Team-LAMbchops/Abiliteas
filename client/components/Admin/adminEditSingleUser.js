import React from 'react'
import {connect} from 'react-redux'
import {editSingleUser} from '../../store/admin'
import {Link} from 'react-router-dom'

class AdminEditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      isAdmin: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmitEditSingleUser(
      this.props.match.params.userId,
      this.state
    )
  }

  render() {
    return (
      <div>
        <h1>Admin Edit User : {this.state.name}</h1>
        <Link to="/admin/users">Admin All Users</Link>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="User First Name">First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />

          <label htmlFor="User Last Name">Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />

          <label htmlFor="User Email">E-Mail:</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />

          <label htmlFor="User Address">Address:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />

          <label htmlFor="User Admin Status">Admin Status:</label>
          <input
            type="text"
            name="isAdmin"
            onChange={this.handleChange}
            value={this.state.isAdmin}
          />

          <Link to="/admin/users">
            <button type="submit">Submit</button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.admin.allUsers,
    user: state.admin.singleUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitEditSingleUser: (id, user) => dispatch(editSingleUser(id, user))
  }
}

const adminEditUserContainer = connect(mapStateToProps, mapDispatchToProps)(
  AdminEditUser
)

export default adminEditUserContainer
