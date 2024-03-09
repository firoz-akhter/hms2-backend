const mongoose = require('mongoose')



const doctorSchema = new mongoose.Schema({
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
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    }],
})


// export
module.exports = mongoose.model("Doctor", doctorSchema);

