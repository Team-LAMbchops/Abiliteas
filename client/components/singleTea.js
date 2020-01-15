import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTea} from '../store/teas'
import {addToCart} from '../store/cart'
import CartContainer from './cart'
class SingleTea extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.teaId
    this.props.getSingleTea(id)
  }

  render() {
    const tea = this.props.singleTea
    return (
      <div>
        <h1>{tea.name}</h1>
        <h3>{tea.flavor}</h3>
        <img src={tea.imageUrl} width={200} height={200} mode="fit" />
        <p>Description: {tea.description}</p>
        <p>Price: ${tea.price}</p>
        <button onClick={() => this.props.addToCart(tea)}>Add To Cart</button>
        <div>
          <CartContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleTea: state.teas.singleTea
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleTea: id => dispatch(fetchSingleTea(id)),
    addToCart: item => dispatch(addToCart(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTea)
