const router = require('express').Router()
const {Tea} = require('../db/models')
module.exports = router

router.get('/:teaId', async (req, res, next) => {
  try {
    const singleTea = await Tea.findOne({
      where: {
        id: req.params.teaId
      }
    })
    res.json(singleTea)
  } catch (err) {
    next(err)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const teas = await Tea.findAll()
    res.json(teas)
  } catch (err) {
    next(err)
  }
})
