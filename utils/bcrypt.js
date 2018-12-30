const bcrypt = require('bcrypt')
const saltRounds = 10
const myPlaintextPassword = 'met_moi_20_stp'


const getHashedPassword = () => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            if(err)
                reject(err)
            resolve(hash)
        })
    })
}

checkHashedPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            if(err)
                reject()
            resolve(res)
        })
    })
}

module.exports = {
    getHashedPassword,
    checkHashedPassword
}