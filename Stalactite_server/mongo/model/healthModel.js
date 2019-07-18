const mongoose = require('mongoose')
const HealthDataSchema = require('./../schema/healthSchema')


mongoose.model('HealthDataSchema', HealthDataSchema)
module.exports = mongoose.model('HealthDataSchema')