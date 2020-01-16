const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Completed'),
    defaultValue: 'Pending',
    allowNull: false
  }
})

module.exports = Order
