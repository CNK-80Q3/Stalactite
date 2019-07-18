const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MicroblogDataSchema = new Schema({
  content: String,
  account: String,
  nickname: String,
  role: Number,
  like: [
    {
      _id: false,
      MicroblogId: false,
      likeAccount: String,
      likeName: String,
      hitCount: Number,
      likeOrNot: false,
    }
  ],
  comment: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  pictures: Array,
  date: {
    type: Date,
    default: Date.now()
  },
})

MicroblogDataSchema.pre('save', function (next) {
  // 判断是否为新建，更改时间
  if (this.isNew) {
    this.createAt = this.date = Date.now();
  } else {
    this.date = Date.now();
  }

  next();
});

module.exports = MicroblogDataSchema