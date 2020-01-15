const router = require('express').Router()
const {Cart, Tea} = require('../db/models')
module.exports = router

router.get('/:UserId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.UserId
      },
      include: [{model: Tea}]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
