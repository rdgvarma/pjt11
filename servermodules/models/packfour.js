const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fdpktfour = new Schema({
        "TN":Number,
        "PD":
        {
        "UDID":Number,
        "TS":String,
        "PktType":Number,
        "Priority": String,
        "SZ":Number,
        "APD":
        {
        "DF_RESP": String
        }
        }
})

module.exports = mongoose.model('fdpcktfourpost',fdpktfour);