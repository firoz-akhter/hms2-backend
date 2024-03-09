// kis doctor ke vaha
// kis patient ka
// appoint number kitna hai

const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    doctor: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Doctor",
        type: String,
        required: true,
    },
    patient: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Patient",
        type: String,
        required: true,
    },
    appointmentNumber: {
        type: Number,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    }
})



module.exports = mongoose.model("Appointment", appointmentSchema);

