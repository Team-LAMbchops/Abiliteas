const router = require('express').Router()
const {
  isAdminMiddleware,
  isAuthMiddleware
} = require('./securityMiddleware/check-Auth')
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

router.post('/', isAdminMiddleware, async (req, res, next) => {
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

router.put('/:teaId', isAdminMiddleware, async (req, res, next) => {
  try {
    const tea = await Tea.findByPk(req.params.teaId)
    const {name, flavor, description, price, inventory, imageUrl} = req.body
    const updatedTea = await tea.update({
      name,
      flavor,
      description,
      price: price * 100,
      inventory,
      imageUrl
    })
    res.json(updatedTea)
  } catch (err) {
    next(err)
  }
})

router.delete('/:teaId', isAdminMiddleware, async (req, res, next) => {
  try {
    const tea = await Tea.findByPk(req.params.teaId)
    if (!tea) return res.sendStatus(404)
    await tea.destroy()
    res.json(tea)
  } catch (err) {
    next(err)
  }
})
