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

router.delete('/:teaId', async (req, res, next) => {
  try {
    const tea = await Tea.findByPk(req.params.teaId)
    if (!tea) return res.sendStatus(404)
    await tea.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
