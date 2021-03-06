import React from 'react'
import {connect} from 'react-redux'
import {fetchTeas, deleteSingleTea} from '../../store/teas'
import {Link} from 'react-router-dom'

class AdminAllTeas extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
  }

  render() {
    const teas = this.props.teas
    return (
      <div>
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>
        <h1>Admin All Teas</h1>
        <Link to="/admin/addTea">Add New Tea</Link>

        {teas.map(tea => {
          return (
            <div key={tea.id}>
              <h3>
                <Link to={`/teas/${tea.id}`}>{tea.name}</Link>
              </h3>
              <p>{tea.description}</p>
              <p>{tea.price}</p>
              <Link to={`/teas/${tea.id}`}>
                <img src={tea.imageUrl} width={200} height={200} mode="fit" />
              </Link>
              <Link to={`/admin/editTea/${tea.id}`}>
                <button type="button">Edit Tea</button>
              </Link>
              <button
                type="button"
                onClick={() => this.props.removeSingleTea(tea.id)}
              >
                Remove Tea From Store
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas.allTeas,
    user: state.user.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTeas: () => dispatch(fetchTeas()),
    removeSingleTea: teaId => dispatch(deleteSingleTea(teaId))
  }
}

const adminAllTeaContainer = connect(mapStateToProps, mapDispatchToProps)(
  AdminAllTeas
)

export default adminAllTeaContainer
