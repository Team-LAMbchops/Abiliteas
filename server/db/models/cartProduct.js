const Sequelize = require('sequelize')
const db = require('../db')

//defining our through table
const CartProduct = db.define('cart_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = CartProduct
