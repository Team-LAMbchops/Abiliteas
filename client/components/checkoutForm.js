import React from 'react'

function CheckoutForm(props) {
  return (
    <div>
      <h1>Checkout Form to be added to Checkout Page! </h1>
      <form onSubmit={this.handleSubmit}>
        First Name:
        <input
          type="text"
          name="firstName"
          onChange={this.handleSubmit}
          value={this.state.firstName}
        />
        Last Name:
        <input
          type="text"
          name="lastName"
          onChange={this.handleSubmit}
          value={this.state.lastName}
        />
        Address:
        <input
          type="text"
          name="address"
          onChange={this.handleSubmit}
          value={this.state.address}
        />
        Email Address:
        <input
          type="text"
          name="emailAddress"
          onChange={this.handleSubmit}
          value={this.state.email}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Place Order
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm

//REVIEW ORDER

// import React from 'react'
// import { fetchSingleTea } from '../store/teas'

// export default class ReviewOrder extends React.Component {
//     constructor(props){
//         super(props)
//     }

//     componentDidMount(){
//         const id = this.props.match.params

//     }

//     //display single order and its order products
//     //display name of product, quantity, price of item
//     //display subtotal and grand total (which are the same)
//     //display place order button and use addSingleOrder prop from mapDispatchToProps

//     render(){

//         const order = this.props.singleOrder
//         console.log('SINGLE ORDER PROP', order)

//         const orderProducts = this.props.singleOrder.order
//         console.log('single orderProducts!!', orderProducts)

//         return (
//             <div>
//                 <h1>Review Your Order</h1>

//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         singleOrder: state.tea.singleTea
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getASingleOrder: (id) => dispatch(fetchSingleTea(id))
//     }
// }

//we will mapDispatch addASingleOrder in the checkout component
