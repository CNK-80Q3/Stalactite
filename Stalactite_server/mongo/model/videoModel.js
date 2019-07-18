const mongoose = require('mongoose')
const VideoDataSchema = require('./../schema/videoSchema')


mongoose.model('VideoDataModel', VideoDataSchema)
module.exports = mongoose.model('VideoDataModel')