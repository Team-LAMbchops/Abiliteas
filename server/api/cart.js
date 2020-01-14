const router = require('express').Router()
const {Cart, User, CartProduct, Tea} = require('../db/models')
module.exports = router

router.get('/:UserId', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: req.params.UserId
      },
      include: [{model: Cart}]
    })
    const cartProducts = await CartProduct.findAll({
      where: {
        cartId: cart.id
      }
    })
    res.json(cartProducts)
  } catch (err) {
    next(err)
  }
})
