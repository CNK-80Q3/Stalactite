const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserDataSchema = new Schema({
  avatar: Array,
  name: String,
  password: String,
  account: String,
  sex: Number,
  role: Number
})

UserDataSchema.methods = {
  comparePassword: function (_userPassword, callback) {
    bcrypt.compare(_userPassword, this.password, (err, isMatch) => {
      if (err) {
        return callback(err)
      }
      callback(null, isMatch)
    })
  }
}
module.exports = UserDataSchema