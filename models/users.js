const db = require('sqlite')
const _ = require('lodash')

module.exports = {
  getAll() {
    return db.all("SELECT * FROM users")
  },
  findOne(id) {
    return db.get("SELECT * FROM users WHERE userId = ?", id)
  },
  async create(params) {

    params.created_at = new Date()
    params.updated_at = new Date()

    const data = _.values(params)

    const { lastID } = await db.run("INSERT INTO users(firstname, lastname, username, password, email, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?)", data)

    return this.findOne(lastID)
  },
}