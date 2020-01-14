const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('carts', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Cart
