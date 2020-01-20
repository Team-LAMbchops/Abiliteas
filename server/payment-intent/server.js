// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET)(
  //our secret key from stripe dashboard: sk_test_kDlLx9QNq5asv9pZCmV8uSCu007sTs4ASe

  async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd'
    })
  }
)()
