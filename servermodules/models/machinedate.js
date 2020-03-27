const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mdata = new Schema({
    gwid: Number 
})

module.exports = mongoose.model('machinedata',mdata);