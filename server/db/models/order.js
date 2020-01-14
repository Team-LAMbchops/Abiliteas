const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
      'Returned'
    ),
    defaultValue: 'Processing',
    allowNull: false
  }
})

module.exports = Order
