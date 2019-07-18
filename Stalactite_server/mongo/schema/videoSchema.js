const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoDataSchema = new Schema({
  Name: String,
  account: String,
  nickname: String,
  role: Number,
  videoes: [
    {
      _id: false,
      albumId: false,
      userAccount: String,
      userName: String,
      address: String
    }
  ],
  createAt: {
    type: Date,
    default: Date.now()
  },
  date: {
    type: Date,
    default: Date.now()
  },
})

VideoDataSchema.pre('save', function (next) {
  // 判断是否为新建，更改时间
  if (this.isNew) {
    this.createAt = this.date = Date.now();
  } else {
    this.date = Date.now();
  }

  next();
});

module.exports = VideoDataSchema