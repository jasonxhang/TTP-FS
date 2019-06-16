const router = require('express').Router()
const axios = require('axios')
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
