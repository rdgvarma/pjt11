const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gfidta = new Schema({
    udid: Number,
    gwid: Number,
    name: String,
    pond: Number,
})

module.exports = mongoose.model('gfidata',gfidta);