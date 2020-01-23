import React from 'react'
import {connect} from 'react-redux'
import {fetchTeas} from '../store/teas'
import {Link} from 'react-router-dom'
import {fetchCreateOrder} from '../store/cart'

class AllTea extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
  }
  async handleClick(tea) {
    const teaObj = tea
    const userId = this.props.user.id
    await this.props.createOrder(userId, teaObj)
  }

  render() {
    const teas = this.props.teas
    return (
      <div>
        <header id="center">
          <img src="/pagelogo.png" width={150} />
        </header>
        <section className="products">
          {teas.map(tea => {
            return (
              <div key={tea.id}>
                <div className="product-card">
                  <div className="product-image">
                    <Link to={`/teas/${tea.id}`}>
                      <img
                        src={tea.imageUrl}
                        width={200}
                        height={200}
                        mode="fit"
                      />
                    </Link>
                  </div>
                  <div className="product-info">
                    <h5>{tea.name}</h5>
                    <button
                      className="AddToCartButton"
                      type="submit"
                      onClick={() => {
                        this.handleClick(tea)
                      }}
                    >
                      <i className="fa fa-shopping-cart" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
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
    getAllTeas: () => dispatch(fetchTeas()),
    createOrder: (userId, tea) => dispatch(fetchCreateOrder(userId, tea))
  }
}

const allTeaContainer = connect(mapStateToProps, mapDispatchToProps)(AllTea)

export default allTeaContainer
