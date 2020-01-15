import React from 'react'
import {connect} from 'react-redux'
import {fetchTeas} from '../store/teas'

class AllTea extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
    console.log(this)
  }

  render() {
    const teas = this.props.teas
    console.log('teas ****', teas)

    return (
      <div>
        <h1>ALL TEAS!!!</h1>
        {teas.map(tea => {
          return (
            <div key={tea.id}>
              <h3>{tea.name}</h3>
              <p>{tea.description}</p>
              <p>{tea.price}</p>
              <img src={tea.imageUrl} width={200} height={200} mode="fit" />
            </div>
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
