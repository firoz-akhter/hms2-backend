// const Administrator = require("../models/Administrator");


// async function adminLogin(req, res) {

//     try {

//         const email = req.body.email;
//         const password = req.body.password;

//         // authentication and authorization ka khel hai yaha
//         const admin = await Administrator.find({email});

//         res.status(200).send(admin);


//     }
//     catch (error) {

//         console.log("Error while logging in...")

//         res.send({
//             success: false,
//             data: "internal server error",
//             message: "Error while logging in..."
//         })

//     }


// }




// module.exports = { adminLogin };