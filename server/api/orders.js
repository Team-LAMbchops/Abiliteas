const router = require('express').Router()
const {Order, OrderProduct, Tea} = require('../db/models')
const {isAdminMiddleware} = require('./securityMiddleware/check-Auth')
module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//path: /orders/:userId/:userId
//cart
//getCartfromDB if there is one
router.get('/:UserId/:UserId', isAdminMiddleware, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.UserId,
        status: 'Pending'
      },
      include: [{model: Tea}]
    })
    if (cart) {
      const cartId = cart.dataValues.id
      const productOrders = await OrderProduct.findAll({
        where: {
          orderId: cartId
        }
      })
      //return the cart & quantity
      //cart.id = orderId
      //cart.teas.forEach ==> put into cart.items in redux store
      //orderProducts.forEach ==> put into cart.qty in redux store as teaId: quantity
      res.json({
        cart: cart,
        orderProducts: productOrders
      })
    }
  } catch (err) {
    next(err)
  }
})
// path: /orders/:UserId
// all orders for an individual user

router.get('/:UserId', isAdminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.UserId,
        status: 'Completed'
      },
      include: [Tea]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// path: /orders/:UserId/:OrdersId
// a single order for a single user
router.get('/:UserId/:OrdersId', isAdminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        userId: req.params.UserId,
        id: req.params.OrdersId,
        status: 'Completed'
      },
      include: [{model: Tea}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//todo: findorCreate an order using the USERID (and teaId), use the teaId and magic method to create orderProduct.

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        status: 'Pending'
      },
      include: [Tea]
    })
    //orderId from query
    const orderId = order[0].dataValues.id
    const currentOrder = await Order.findByPk(orderId)
    //magic method to create throughtable instance
    await currentOrder.addTea(req.body.tea.id)
    const productOrder = await OrderProduct.findOne({
      where: {
        teaId: req.body.tea.id,
        orderId: orderId
      }
    })
    //increase quantity per product
    const qty = productOrder.dataValues.quantity
    await productOrder.update({
      quantity: qty + 1
    })
    //send back order
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//delete entire order
router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
  } catch (error) {
    next(error)
  }
})

//updateOrder
router.put('/:orderId', async (req, res, next) => {
  try {
    const orderUpdate = await Order.findByPk(req.params.orderId)
    await orderUpdate.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      status: 'Completed'
    })
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})
