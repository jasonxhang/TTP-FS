const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stocks', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyName: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  numShares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Stock
