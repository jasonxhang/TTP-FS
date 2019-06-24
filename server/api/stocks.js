const router = require('express').Router()
const axios = require('axios')
const {Stock, StockOrder, User} = require('../db/models')
module.exports = router

const API_KEY = process.env.IEX_PUB_KEY

router.get('/symbols', async (req, res, next) => {
  try {
    const {data} = await axios.get(
      `https://cloud.iexapis.com/stable/ref-data/symbols?token=${API_KEY}`
    )

    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:ticker', async (req, res, next) => {
  try {
    const ticker = req.params.ticker,
      infoRes = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${API_KEY}`
      ),
      info = infoRes.data,
      statsRes = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/stats?token=${API_KEY}`
      ),
      stats = statsRes.data,
      logoRes = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/logo?token=${API_KEY}`
      ),
      logo = logoRes.data,
      quoteRes = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${API_KEY}`
      ),
      quote = quoteRes.data

    const allData = {info, quote, stats, logo}
    res.json(allData)
  } catch (err) {
    next(err)
  }
})

router.post('/order', async (req, res, next) => {
  try {
    const {
      purchaseType,
      quantity,
      price,
      ticker,
      name,
      notes,
      netVal
    } = req.body
    req.body.userId = req.user.id

    const user = await User.findOne({
      where: {id: req.user.id}
    })

    if (purchaseType === 'buy') {
      if (user.balance < netVal) {
        throw new Error('Insufficient funds to place order!')
      } else {
        const arr = await Stock.findOrCreate({
          where: {ticker: ticker, companyName: name}
        })
        const instance = arr[0] // the first element is the instance
        const wasCreated = arr[1] // the second element tells us if the instance was newly created
        if (wasCreated) {
          instance.numShares = quantity
          instance.companyName = name
          instance.userId = req.user.id
          instance.latestPrice = price
          await instance.save()
        } else {
          instance.numShares += parseInt(quantity, 10)
          await instance.save()
        }
      }
    } else if (purchaseType === 'sell') {
      const stock = await Stock.findOne({where: {ticker: ticker}})
      if (quantity > stock.numShares) {
        throw new Error('Not enough shares to sell!')
      } else {
        stock.numShares -= parseInt(quantity, 10)
        stock.latestPrice = price
        await stock.save()
      }
    }

    const response = await StockOrder.create(req.body)
    res.json(response)
  } catch (err) {
    next(err)
  }
})
