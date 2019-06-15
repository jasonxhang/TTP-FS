const User = require('./user')
const Stock = require('./stock')
const StockOrder = require('./stock-order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Stock)
Stock.belongsTo(User)

User.hasMany(StockOrder)
StockOrder.belongsTo(User)

Stock.hasMany(StockOrder)
StockOrder.belongsTo(Stock)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Stock,
  StockOrder
}
