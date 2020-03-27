const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fdpktfive = new Schema({
        "TN":Number,
        "PD":
        {
            "UDID":Number,
            "TS":String,
            "PktType":Number,
            "Priority": String,
            "SZ":Number,
            "APD":{
                     "Status": String
                  }
        }
})

module.exports = mongoose.model('fdpcktfiveresp',fdpktfive);