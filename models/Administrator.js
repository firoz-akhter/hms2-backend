// banane ke zrurt nhi thi
// single entry direct de sakte hai database me


const mongoose = require('mongoose')


const administratorSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        requried: true,
    }
})





// export
module.exports = mongoose.model("Administrator", administratorSchema)