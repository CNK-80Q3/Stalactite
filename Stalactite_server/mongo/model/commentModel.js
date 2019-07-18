const mongoose = require('mongoose')
const CommentDataSchema = require('./../schema/commentSchema')


mongoose.model('CommentDataSchema', CommentDataSchema)
module.exports = mongoose.model('CommentDataSchema')