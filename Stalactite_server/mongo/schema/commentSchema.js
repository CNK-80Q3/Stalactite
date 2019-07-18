const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const CommentDataSchema = new Schema({
	fromUser: {
		type: ObjectId,
		ref: 'UserDataModel'
	},
	toArticle: {
		type: ObjectId,
		ref: 'ArticleDataModel'
	},
	comment: String,
	createAt: {
		type: Date,
		default: Date.now()
	},
	date: {
		type: Date,
		default: Date.now()
	},
})

CommentDataSchema.pre('save', function(next) {
    // 判断是否为新建，更改时间
    if (this.isNew) {
        this.createAt = this.date = Date.now();
    } else {
        this.date = Date.now();
    }

    next();
});

module.exports = CommentDataSchema