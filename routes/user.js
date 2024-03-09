const express = require("express");
const {signup, login, createDoctor, createAdmin, allPatients, allDoctors} = require("../controllers/AuthController");
const {auth, isStudent, isAdmin} = require("../middlewares/auth.js");

const {addAppointment, allAppointments, deleteAppointment} = require("../controllers/AppointmentController.js");
const {addSession, allSessions, deleteSession} = require("../controllers/SessionController.js");
const { deleteDoctor, updateDoctor } = require("../controllers/DoctorController.js");
const { updatePatient, deletePatient } = require("../controllers/PatientController.js");



const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);
// login controller likhna baki hai(in diff type)

// router.post("/createAdmin", createAdmin);

router.post("/addNewAppointment/:id", addAppointment);
router.post("/deleteAppointment", deleteAppointment)

router.post("/addSession", addSession);
router.post("/deleteSession", deleteSession)

router.post("/createDoctor", createDoctor);
router.put("/updateDoctor/:id", updateDoctor);
router.post("/deleteDoctor", deleteDoctor);
router.post("/deletePatient", deletePatient);

router.put("/updatePatient/:id", updatePatient);    

 


router.get("/test", auth, (req, res) => { 
    res.json({
        success: true,
        message: "Welcome to the protected route for test."
    })
})

// protected route
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for students..."
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for admin...",
    })
})

router.get("/allPatients", allPatients);
router.get("/allDoctors", allDoctors);
router.get("/allAppointments", allAppointments);
router.get("/allSessions", allSessions);


// router.get("/userLogin", userLogin);
// userLogin will one by one
// admin dbCollection me send email and password hai ki nhi
// fir doctor dbCollection me entered email and password hai ki nhi
// fir patient dbCollection me entered email and password hai ki nhi
// kisi na kisi me mil he jyega uske hisab se us page pe user ko 
// user ko land kara denge

// router.get("/userLogin", auth, isAdmin-or-Doctor-or-Patient); 
// auth is for token check

// router.post("/addDoctor", addDoctor) // ye chalega from admin Profile





module.exports = router;