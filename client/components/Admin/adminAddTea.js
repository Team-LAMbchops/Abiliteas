import React from 'react'
import {connect} from 'react-redux'
import {createSingleTea} from '../../store/teas'
import {Link} from 'react-router-dom'

class AdminAddTea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      flavor: '',
      description: '',
      price: '',
      inventory: '',
      imageUrl: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addSingleTea(this.state)
    this.setState({
      name: '',
      flavor: '',
      description: '',
      price: '',
      inventory: '',
      imageUrl: ''
    })
  }

  render() {
    return (
      <div>
        <h1>Admin Add Tea</h1>
        <Link to="/admin/teas">Admin All Teas</Link>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Tea Name">Tea Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label htmlFor="Tea Flavor">Tea Flavor:</label>
          <input
            type="text"
            name="flavor"
            onChange={this.handleChange}
            value={this.state.flavor}
          />

          <label htmlFor="Tea Description">Tea Description:</label>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />

          <label htmlFor="Tea Price">Tea Price:</label>
          <input
            type="text"
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />

          <label htmlFor="Inventory Quantity">Inventory Quantity:</label>
          <input
            type="text"
            name="inventory"
            onChange={this.handleChange}
            value={this.state.inventory}
          />

          <label htmlFor="Tea Image URL">Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <Link to="/admin/teas">
            <button type="submit">Submit</button>
          </Link>
        </form>
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
    addSingleTea: newTea => dispatch(createSingleTea(newTea))
  }
}

const adminAddTeaContainer = connect(mapStateToProps, mapDispatchToProps)(
  AdminAddTea
)

export default adminAddTeaContainer
