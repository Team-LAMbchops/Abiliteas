const router = require('express').Router()
const {Order, OrderProduct, Tea} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// path: /orders/:UserId
// all orders for an individual user

router.get('/:UserId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.UserId
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
router.get('/:UserId/:OrdersId', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        userId: req.params.UserId,
        id: req.params.OrdersId
      },
      include: [{model: Tea}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
