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
    //need to assign latestprice and day's open price
    // const test = response.map(el => {
    //   return el.ticker
    // })
    // console.log(test)

    // await Promise.all(
    //   response.forEach(async stock => {
    //     try {
    //       const quoteRes = await axios.get(
    //           `https://cloud.iexapis.com/stable/stock/${
    //             stock.ticker
    //           }/quote?token=${API_KEY}`
    //         ),
    //         quote = quoteRes.data
    //       stock.latestPrice = quote.latestPrice
    //       stock.daysOpenPrice = quote.open
    //       await stock.save()
    //       // console.log(stock.ticker)
    //     } catch (e) {
    //       console.error(e)
    //     }
    //   })
    // )

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
        // console.log(stock.ticker)
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
