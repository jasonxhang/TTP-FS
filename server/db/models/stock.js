const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stocks', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numShares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  latestPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  daysOpenPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Stock
