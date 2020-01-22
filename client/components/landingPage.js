import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTeas} from '../store/teas'

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
  }

  render() {
    const teas = this.props.teas
    return <div>Landing Page Container</div>
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas.allTeas
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTeas: () => dispatch(fetchTeas())
  }
}

const LandingPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  LandingPage
)

export default LandingPageContainer
