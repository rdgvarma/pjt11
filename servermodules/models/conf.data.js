const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cfdata = new Schema({
    udid: Number,
    gwid: Number,
    ts: String,
    seedcount: Number,
    totslots: Number,
    starttime: String,
    slotinterval: Number,
    totfeedfortoday:Number,
    slot_1: Number,
    slot_2: Number,
    slot_3: Number,
    slot_4: Number,
    slot_5: Number,
    slot_6: Number,
    fav: Number,
    atd : String,

})

module.exports = mongoose.model('confdata',cfdata);