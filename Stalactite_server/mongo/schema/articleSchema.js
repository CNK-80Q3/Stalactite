const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleDataSchema = new Schema({
	title: String,
	like: Number,
  content: String,
  from: String,
	createAt: {
		type: Date,
		default: Date.now()
	},
	date: {
		type: Date,
		default: Date.now()
	},
})

ArticleDataSchema.pre('save', function(next) {
    // 判断是否为新建，更改时间
    if (this.isNew) {
        this.createAt = this.date = Date.now();
    } else {
        this.date = Date.now();
    }

    next();
});

module.exports = ArticleDataSchema