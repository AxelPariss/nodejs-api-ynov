const db = require('sqlite')
const _ = require('lodash')

module.exports = {
  getTodos(userId) {
    return db.all("SELECT rowid AS id, * FROM todos WHERE userId = ?", userId)
  }
}