import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTeas} from '../store/teas'
import userProfile from './userProfile'

class UserHome extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
  }

  render() {
    const teas = this.props.teas
    const user = this.props.user
    return (
      <div>
        <div id="showcase">
          <div id="userWelcomePage">
            <div id="userNameWelcome">
              Do not underestimate your abiliteas, {user.firstName}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas.allTeas,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTeas: () => dispatch(fetchTeas())
  }
}

const UserHomeContainer = connect(mapStateToProps, mapDispatchToProps)(UserHome)

export default UserHomeContainer
