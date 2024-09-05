const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

}, { timestamps: true, strict: false })



const userModel = mongoose.model('users', userSchema)


module.exports = userModel;