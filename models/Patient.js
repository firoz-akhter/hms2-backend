const mongoose = require("mongoose");






// sirf user signup karegaconst mongoose = require('mongoose')



const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        requried: true,
    },
    address: {
        type: String,
        requried: true,
    },
    birthdate: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        requried: true,
    },
    mobileNumber: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    },
    role: {
        type: String,
        required: true,
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    }],
})


// export

module.exports = mongoose.model("Patient", patientSchema);

