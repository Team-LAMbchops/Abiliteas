const router = require('express').Router()
const {Order, Tea} = require('../db/models')
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

// path: /orders/:UserId
// all orders for an individual user

router.get('/:UserId', isAdminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.UserId,
        status: 'Completed'
      },
      include: [{model: Tea}]
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

//path: /cart
//cart

router.get('/:UserId', isAdminMiddleware, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.UserId,
        status: 'Pending'
      },
      include: [{model: Tea}]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destory({
      where: {
        id: req.params.orderId
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderUpdate = await Order.findbyPk(req.params.orderId)
    orderUpdate.update(req.body)
    res.json(orderUpdate)
  } catch (error) {
    next(error)
  }
})
