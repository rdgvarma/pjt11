const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fddata = new Schema({
    udid: Number,
    gwid: Number,
    name: String,
    pond: Number,
    weight: Number,
    time: Number,
    usersystime:String,
})

module.exports = mongoose.model('userfdata',fddata);