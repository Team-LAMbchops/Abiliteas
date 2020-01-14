const User = require('./user')
const Cart = require('./cart')
const Order = require('./order')
const Tea = require('./tea')
const OrderProduct = require('./orderProduct')
const CartProduct = require('./cartProduct')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsTo(Cart)
User.hasMany(Order)
Order.belongsToMany(Tea, {through: OrderProduct})
Tea.belongsToMany(Order, {through: OrderProduct})
Cart.belongsToMany(Tea, {through: CartProduct})
Tea.belongsToMany(Cart, {through: CartProduct})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Order,
  Tea,
  OrderProduct,
  CartProduct
}
