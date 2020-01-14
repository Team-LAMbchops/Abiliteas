import React from 'react'
import {connect} from 'react-redux'
import {fetchTeas} from '../store/teas'

class AllTea extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
  }

  render() {
    const teas = this.props.teas
    console.log('teas ****', teas)

    return (
      <div>
        <h1>ALL TEAS!!!</h1>
        {teas.map(tea => {
          return (
            <ul key={tea.id}>
              <li>{tea.name}</li>
            </ul>
          )
        })}
      </div>
    )
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

const allTeaContainer = connect(mapStateToProps, mapDispatchToProps)(AllTea)

export default allTeaContainer
