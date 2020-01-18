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

router.post('/', async (req, res, next) => {
  try {
    const {name, flavor, description, price, inventory, imageUrl} = req.body
    const newTea = await Tea.create({
      name,
      flavor: flavor ? flavor : 'Organic Oolong Tea',
      description,
      price: price * 100,
      inventory,
      imageUrl: imageUrl
        ? imageUrl
        : 'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_OrientalBeauty_LG.jpg'
    })
    res.json(newTea)
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
