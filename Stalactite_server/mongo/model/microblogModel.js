const mongoose = require('mongoose')
const MicroblogDataSchema = require('./../schema/microblogSchema')


mongoose.model('MicroblogDataModel', MicroblogDataSchema)
module.exports = mongoose.model('MicroblogDataModel')