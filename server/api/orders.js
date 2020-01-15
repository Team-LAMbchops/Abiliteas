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
