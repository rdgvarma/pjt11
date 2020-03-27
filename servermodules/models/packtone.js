const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fdpktone = new Schema({
    TN: Number,
    PD: {
        UDID : Number,
        GWID : Number,
        TS : String,
        PktType : String,
        Priority : Number,
        SZ : Number,
        APD : {
            Notifications : [
                Schema.Types.String
            ]
        }
    }
})

module.exports = mongoose.model('fdpktoneget',fdpktone);