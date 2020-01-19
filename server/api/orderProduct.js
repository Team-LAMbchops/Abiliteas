const router = require('express').Router()
const {Order, OrderProduct, Tea} = require('../db/models')
const {isAdminMiddleware} = require('./securityMiddleware/check-Auth')
module.exports = router

//increment
router.put('/:OrderId/:TeaId', async (req, res, next) => {
  try {
    const productOrder = await OrderProduct.findOne({
      where: {
        teaId: req.params.TeaId,
        orderId: req.params.OrderId
      }
    })
    await productOrder.update({
      quantity: productOrder.quantity + 1
    })
    res.json(productOrder.dataValues)
  } catch (error) {
    next(error)
  }
})
//decrement
