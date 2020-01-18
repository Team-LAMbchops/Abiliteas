const router = require('express').Router()
const {isAdminMiddleware} = require('./securityMiddleware/check-Auth')
const {User} = require('../db/models')

module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isAdminMiddleware, async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'email', 'address']
    })
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})
