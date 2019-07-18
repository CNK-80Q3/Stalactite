const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PictureDataSchema = new Schema({
  name: String,
  account: String,
  nickname: String,
  role: Number,
  pictures: Array,
  createAt: {
    type: Date,
    default: Date.now()
  },
  date: {
    type: Date,
    default: Date.now()
  },
})

PictureDataSchema.pre('save', function (next) {
  // 判断是否为新建，更改时间
  if (this.isNew) {
    this.createAt = this.date = Date.now();
  } else {
    this.date = Date.now();
  }

  next();
});

module.exports = PictureDataSchema