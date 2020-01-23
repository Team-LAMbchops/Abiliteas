import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTea} from '../store/teas'
import {fetchCreateOrder} from '../store/cart'
import {findPrice} from './helperFuncs'

class SingleTea extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.teaId
    this.props.getSingleTea(id)
  }

  async handleClick() {
    const userId = this.props.user.id
    const tea = this.props.singleTea
    await this.props.createOrder(userId, tea)
  }

  render() {
    const tea = this.props.singleTea
    return (
      <div>
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>

        <div className="singleTea">
          <div id="singleTeaImage">
            <img src={tea.imageUrl} width={300} height={300} mode="fit" />
          </div>
          <div id="singleTeaInfo">
            <div id="singleTeaName">{tea.name}</div>
            <div id="singleTeaFlavor">{tea.flavor}</div>
            <p id="singleTeaDescription">{tea.description}</p>
            <p id="singleTeaPrice">
              $ {findPrice(tea.price).toFixed(2)}
              <button
                type="submit"
                onClick={() => {
                  this.handleClick()
                }}
              >
                Add To Cart
              </button>
            </p>
            <div>
              PREPARATION
              <div id="brewInstructions">
                <div id="brewleft">
                  <div>
                    {' '}
                    <img src="/leaf.png" width={50} /> 9 grams | 1.5 tbsp{' '}
                  </div>
                  <div>
                    <img src="/thermometer.png" width={50} /> 160°F | 70°C{' '}
                  </div>
                </div>
                <div id="brewright">
                  <div>
                    <img src="/teapot.png" width={50} /> 12 ounces | 350ml
                  </div>
                  <div>
                    <img src="/steep-time.png" width={50} /> 1.5 minutes |
                    resteep up to 1x{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleTea: state.teas.singleTea,
    user: state.user,
    cart: state.cart,
    order: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleTea: id => dispatch(fetchSingleTea(id)),
    createOrder: (userId, tea) => dispatch(fetchCreateOrder(userId, tea))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTea)
