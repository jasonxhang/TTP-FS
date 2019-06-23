const router = require('express').Router()
const axios = require('axios')
const {StockOrder} = require('../db/models')
module.exports = router

router.get('/all', async (req, res, next) => {
  try {
    const response = await StockOrder.findAll({
      where: {userId: req.user.id}
    })

    res.json(response)
  } catch (err) {
    next(err)
  }
})
