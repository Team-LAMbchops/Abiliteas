const router = require('express').Router()
const {Order, OrderProduct, Tea} = require('../db/models')
const {isAdminMiddleware} = require('./securityMiddleware/check-Auth')
module.exports = router

//increment
router.put('/:OrderId/:TeaId', async (req, res, next) => {
  try {
    const productOrder = await OrderProduct.findOne({
      where: {
        teaId: req.body.TeaId,
        orderId: req.body.OrderId
      }
    })
    if (req.body.type === 'increment') {
      await productOrder.update({
        quantity: productOrder.quantity + 1
      })
      res.json(productOrder.dataValues)
    } else {
      await productOrder.update({
        quantity: productOrder.quantity - 1
      })
      if (productOrder.quantity === 0) {
        await OrderProduct.destroy({
          where: {
            teaId: req.body.TeaId,
            orderId: req.body.OrderId
          }
        })
        res.json({quantity: 0, teaId: req.body.TeaId})
        return
      }
      res.json(productOrder.dataValues)
    }
  } catch (error) {
    next(error)
  }
})
//decrement
