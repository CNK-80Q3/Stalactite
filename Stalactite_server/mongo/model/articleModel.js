const mongoose = require('mongoose')
const ArticleDataSchema = require('../schema/articleSchema')


mongoose.model('ArticleDataModel', ArticleDataSchema)
module.exports = mongoose.model('ArticleDataModel')