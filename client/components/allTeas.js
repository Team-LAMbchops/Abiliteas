import React from 'react'
import {connect} from 'react-redux'

class AllTea extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>ALL TEAS!!!</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const allTeaContainer = connect(mapStateToProps, mapDispatchToProps)(AllTea)

export default allTeaContainer
