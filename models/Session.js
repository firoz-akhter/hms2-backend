// kis doctor ka session
// start time kya hai

const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    doctor: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Doctor",
        type: String,
        required: true,
    },
    date: {
        type: String, // have date and time both 
        // type: "String",
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    maxBooking: {
        type: Number,
        required: true,
    }
})


module.exports = mongoose.model("Session", sessionSchema);