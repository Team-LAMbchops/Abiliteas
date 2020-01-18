import React from 'react'
import {connect} from 'react-redux'
import {fetchTeas} from '../../store/teas'
import {Link} from 'react-router-dom'

class AdminPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Link to="/admin/teas">Teas</Link>
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
