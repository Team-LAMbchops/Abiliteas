const router = require('express').Router()
const {Cart, User} = require('../db/models')
module.exports = router

router.get('/:UserId', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: req.params.UserId
      },
      include: [{model: Cart}]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
