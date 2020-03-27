const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fdpkttwo = new Schema({
    TN: 'number',
    PD: {
        UDID : 'number',
        GWID : 'number',
        TS : 'string',
        PktType : 'String',
        Priority : 'string',
        SZ : 'number',
        APD : {
            DispenseFeed : {
                Weight : 'number',
                Time : 'number'
            },
        }
    }
})

module.exports = mongoose.model('fdpckttwoget',fdpkttwo);