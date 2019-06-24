const router = require('express').Router()
const {Stock} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const axios = require('axios')

const API_KEY = process.env.IEX_PUB_KEY

router.get('/', async (req, res, next) => {
  try {
    const response = await Stock.findAll({
      where: {
        userId: req.user.id,
        numShares: {
          [Op.gt]: 0
        }
      }
    })

    response.forEach(async stock => {
      try {
        const quoteRes = await axios.get(
            `https://cloud.iexapis.com/stable/stock/${
              stock.ticker
            }/quote?token=${API_KEY}`
          ),
          quote = quoteRes.data
        stock.latestPrice = quote.latestPrice
        stock.daysOpenPrice = quote.open
        await stock.save()
      } catch (e) {
        console.error(e)
      }
    })

    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
