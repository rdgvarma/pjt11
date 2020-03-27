const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cfrecdata = new Schema({
   TN : Number,
   PD : {
       UDID : Number,
       TS : String,
       PktType : Number,
       Priority: String,
       SZ: Number,
       APD : {
           CONF_RESP : String
       }
   }
})

module.exports = mongoose.model('cfrecdata',cfrecdata);