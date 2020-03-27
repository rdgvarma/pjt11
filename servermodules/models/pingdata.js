const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pingdta = new Schema({
    udid: Number,
    gwid: Number,
    name: String,
    pond: Number,
})

module.exports = mongoose.model('pingdata',pingdta);