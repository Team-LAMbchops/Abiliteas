const router = require('express').Router()
const {Order, Tea, OrderProduct} = require('../db/models')
const {isAdminMiddleware} = require('./securityMiddleware/check-Auth')
module.exports = router
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const orderProducts = await OrderProduct.findAll()
    res.json(orderProducts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrderProduct = await OrderProduct.create({
      quantity: req.body.qty,
      orderId: req.body.orderId,
      teaId: req.body.teaId
    })
    res.json(newOrderProduct)
  } catch (error) {
    next(error)
  }
})

// router.put('/', async(req, res, next) => {
//   try {
//     const orderProductUpdate = await OrderProduct.findOne({where: }
//     )
//   } catch (error) {
//     next(error)
//   }
// })
