const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confpkt = new Schema({
    TN: Number,
    PD:{
        UDID: Number,
        TS: String,
        PktType: Number,
        Priority: String,
        SZ: Number,
        APD:{
            SeedCount: Number,
            SlotsData:{
                TotSlots: Number,
                StartTime: String,
                SlotInterval: Number,
                TotFeedforToday: Number,
            },
            SlotsInternalData:{
                '%FeedPerSlot':{
                    Slot_1: Number,
                    Slot_2: Number,
                    Slot_3: Number,
                    Slot_4: Number,
                    Slot_5: Number,
                    Slot_6: Number,
                }
            },
            FAV : Number,
            "!ATD": String,
            AltStt:[]
        }
    }
})

module.exports = mongoose.model('confpktres',confpkt);