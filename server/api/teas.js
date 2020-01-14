const router = require('express').Router()
const {Tea} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const teas = await Tea.findAll()
    res.json(teas)
  } catch (err) {
    next(err)
  }
})
