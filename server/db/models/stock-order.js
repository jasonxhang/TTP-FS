const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const StockOrder = db.define('stock-orders', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchaseType: {
    type: Sequelize.ENUM('buy', 'sell'),
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true
  },
  netVal: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

const adjustBalance = async order => {
  if (order.purchaseType === 'buy') {
    const user = await User.findByPk(order.userId)
    user.balance = parseFloat(user.balance - order.netVal, 10)
    const updatedUser = await user.save()

    console.log(updatedUser.dataValues.balance)
  } else if (order.purchaseType === 'sell') {
    const user = await User.findByPk(order.userId)
    user.balance = parseFloat(user.balance + order.netVal, 10)
    const updatedUser = await user.save()

    console.log(updatedUser.dataValues.balance)
  }
}

StockOrder.afterCreate(adjustBalance)

// StockOrder.prototype.adjustBalance = async order => {
//   if (order.purchaseType === 'buy') {
//     const user = await User.findByPk(order.userId)
//     user.balance = parseFloat(user.balance - order.netVal, 10)
//     const updatedUser = await user.save()

//     console.log(updatedUser.dataValues.balance)
//   } else if (order.purchaseType === 'sell') {
//     const user = await User.findByPk(order.userId)
//     user.balance = parseFloat(user.balance + order.netVal, 10)
//     const updatedUser = await user.save()

//     console.log(updatedUser.dataValues.balance)
//   }
// }

module.exports = StockOrder
