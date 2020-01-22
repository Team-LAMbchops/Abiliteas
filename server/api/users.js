const router = require('express').Router()
const {
  isAdminMiddleware,
  isAuthMiddleware
} = require('./securityMiddleware/check-Auth')
const {User} = require('../db/models')

module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email', 'address']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isAuthMiddleware, async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'email', 'address', 'firstName', 'lastName']
    })
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAuthMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const {firstName, lastName, email, address, isAdmin} = req.body
    const updatedUser = await user.update({
      firstName,
      lastName,
      email,
      address,
      isAdmin
    })
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAuthMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) return res.sendStatus(404)
    await user.destroy()
    res.json(user)
  } catch (err) {
    next(err)
  }
})
