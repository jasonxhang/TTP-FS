const Sequelize = require('sequelize')
const db = require('../db')

const StockOrder = db.define('stock-orders', {
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
  },
  transactionType: {
    type: Sequelize.ENUM('buy', 'sell'),
    allowNull: false
  },
  sharePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = StockOrder
