const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;
const  roomSchema  =  new Schema({
    name: {
        type: String
    },
    zone: {
        type: String
    },
    lastService: { 
        type: Date
    },
    lastFullService: {
        type: Date
    },
    lastCurtainWash: {
        type: Date
    },
    lastDoonaWash: {
        type: Date
    },
});

module.exports = mongoose.model('Room', roomSchema);

