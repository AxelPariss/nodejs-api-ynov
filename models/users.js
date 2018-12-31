const db = require('sqlite')
const _ = require('lodash')

const bcrypt = require('bcrypt')
const saltRounds = 10
const myPlaintextPassword = 's0/\/\P4$$w0756ljzef$zeforD'

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


    await bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
      data[3] = hash
      const { lastID } = await db.run("INSERT INTO users(firstname, lastname, username, password, email, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?)", data)

      return this.findOne(lastID)
    })
  },
  delete(id) {
    return db.run("DELETE FROM users WHERE userId = ?", id)
  },
  async update(params) {
    let string = ''

    for (k in params) {
      if (k !== 'userId') {
        string += k + ' = ?,'
      }
    }

    string = string.substring(0, string.length - 1); // Remove last comma

    const data = _.values(params)
    console.log('string', string)
    console.log('data', data)
    const { changes } = await db.run("UPDATE users SET " + string + " WHERE userId = ?", data)
    
    if (changes !== 0) {
      return this.findOne(params.id)
    } else {
      return Promise.reject({ message: 'Could not find id' })
    }
  },
}