import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
    let token = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) console.log('Purchase Complete!')
  }

  render() {
    if (this.state.complete) {
      return <h1>Purchase Complete</h1> //why is this not returning after i complete a purchase?
    } else {
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase</button>
        </div>
      )
    }
  }
}

export default injectStripe(CheckoutForm)

// import React from 'react';
// import {injectStripe} from 'react-stripe-elements';

// import CardSection from './CardSection';

// class CheckoutForm extends React.Component {
//   handleSubmit = (ev) => {
//     // We don't want to let default form submission happen here, which would refresh the page.
//     ev.preventDefault();

//     // See our confirmCardPayment documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
//     this.props.stripe.confirmCardPayment('process.env.STRIPE_SECRET', { // //our secret key from stripe dashboard: sk_test_kDlLx9QNq5asv9pZCmV8uSCu007sTs4ASe
//       payment_method: {
//         card: this.props.elements.getElement('card'),
//         billing_details: {
//           name: 'Jenny Rosen',
//         },
//       }
//     });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <CardSection />
//         <button>Confirm order</button>
//       </form>
//     );
//   }
// }

// export default injectStripe(CheckoutForm);
