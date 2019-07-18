const mongoose = require('mongoose')
const PictureDataSchema = require('./../schema/pictureSchema')


mongoose.model('PictureDataModel', PictureDataSchema)
module.exports = mongoose.model('PictureDataModel')