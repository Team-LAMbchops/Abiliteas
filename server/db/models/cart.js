const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('carts')

module.exports = Cart
