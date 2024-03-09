const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Administrator = require("../models/Administrator")
const Doctor = require("../models/Doctor")


const JWT_SECRET = "Firoz";



async function signup(req, res) { // this is only for patient

    try {
        
        // data nikalo req body se
        // const {name, email, password, role} = req.body;
        const {firstName, lastName, address, birthdate, email, mobileNumber, password} = req.body;
 

        const existingUser = await Patient.findOne({email})

        if(existingUser) {
            res.status(400).json({
                success: false,
                message: "Patient already exists",
            })
            return ;
        }


        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);            
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error in decrypting password..."
            })
            return ;
        }

        const patient = await Patient.create({
            firstName, lastName, address, birthdate, email, mobileNumber, password: hashedPassword, role: "patient",
        })

        res.status(200).json({
            success: true,
            message: "Patient Created Successfully..."
        })


    }
    catch(error) {
        res.send("something went wrong while signing up...");
    }

}

async function userLogin(res, user, password) {

    const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
    }

    if(await bcrypt.compare(password, user.password)) {

        // res.send("on line 93")
        let token = jwt.sign(payload,
                            JWT_SECRET,
                            {expiresIn: "2h"},
                            )
        
        
        user = user.toObject();
        user.token = token;
        user.password = undefined;
        // console.log("userData: ", user);
        
        const options = {
            expires: new Date( Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "User logged in successfully"
        })
        
        
    }
    else {
        return res.status(403).json({
            success: false,
            message: "Password Incorrect",
        })
    }
}



async function adminLogin(res, admin, password) {

    const payload = {
        email: admin.email,
        id: admin._id,
        role: admin.role,
    }

    if(await bcrypt.compare(password, admin.password)) {

        // res.send("on line 93")
        let token = jwt.sign(payload,
                            JWT_SECRET,
                            {expiresIn: "2h"},
                            )
        
        
        admin = admin.toObject();
        admin.token = token;
        admin.password = undefined;
        // console.log("adminData: ", admin);
        
        const options = {
            expires: new Date( Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: admin,
            message: "admin logged in successfully"
        })

        
        
    }
    else {
        return res.status(403).json({
            success: false,
            message: "Password Incorrect",
        })
    }
}


async function doctorLogin(res, doctor, password) {

    const payload = {
        email: doctor.email,
        id: doctor._id,
        role: doctor.role,
    }

    if(await bcrypt.compare(password, doctor.password)) {

        // res.send("on line 93")
        let token = jwt.sign(payload,
                            JWT_SECRET,
                            {expiresIn: "2h"},
                            )
        
        
        doctor = doctor.toObject();
        doctor.token = token;
        doctor.password = undefined;
        // doctor.role = "doctor";
        // console.log("doctorData", doctor); 
        
        const options = {
            expires: new Date( Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: doctor,
            message: "doctor logged in successfully"
        })

        
        
    }
    else {
        return res.status(403).json({
            success: false,
            message: "Password Incorrect",
        })
    }
}



async function login(req, res) {

    // const JWT_SECRET = "Firoz";

    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill the details carefully...",
            })
        }

        
        let admin = await Administrator.findOne({email});
        let doctor = await Doctor.findOne({email});
        let user = await Patient.findOne({email});
        



        if(!user && !admin && !doctor) {
            return res.status(401).json({
                success: false,
                message: "user is not registered with us.",
            })
        }

        if(admin) {
            adminLogin(res, admin, password);
        }
        if(doctor) {
            doctorLogin(res, doctor, password);
        }
        if(user) {
            userLogin(res, user, password);
        }
    }
    catch(error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        })

    }

}





async function createDoctor(req, res) { // this is only for patient

    try {
        
        const {firstName, lastName, address, birthDate, email, mobileNumber, password} = req.body;
 
        const existingUser = await Doctor.findOne({email})

        if(existingUser) {
            res.status(400).json({
                success: false,
                message: "Doctor already exists",
            })
            return ;
        }


        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);            
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error in decrypting password..."
            })
            return ;
        }

        const doctor = await Doctor.create({
            // name, email, password: hashedPassword, role,
            firstName, lastName, address, birthDate, email, mobileNumber, password: hashedPassword, role: "doctor",
        })

        res.status(200).json({
            success: true,
            message: "Doctor added Successfully..."
        })


    }
    catch(error) {
        res.send("something went wrong while signing up...");
    }

}




async function createAdmin(req, res) { // this is only for patient

    try {
        
        // data nikalo req body se
        // const {name, email, password, role} = req.body;
        const {firstName, lastName, address, birthDate, email, mobileNumber, password} = req.body;
 

        const existingUser = await Administrator.findOne({email})

        if(existingUser) {
            res.status(400).json({
                success: false,
                message: "Admin already exists",
            })
            return ;
        }


        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);            
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error in decrypting password..."
            })
            return ;
        }

        const admin = await Administrator.create({
            // name, email, password: hashedPassword, role,
            firstName, lastName, address, birthDate, email, mobileNumber, password: hashedPassword, role: "admin",
        })

        res.status(200).json({
            success: true,
            message: "admin added Successfully..."
        })


    }
    catch(error) {
        res.send("something went wrong while admin signing up...");
    }

}



async function allPatients(req, res) {
    try {
        // fetch all users
        
        const allUsers = await Patient.find({})

        if(!allUsers) {
            return res.status(401).json({
                success: false,
                message: "Users bucket is empty.",
            })
        }


        res.status(200).json({
            success: true,
            allUsers,
            message: "All users are fetched successfully"
        })


    }
    catch (error) {
        res.send("something went wrong while fetching all Users...");
    }
}



async function allDoctors(req, res) {
    try {
        // fetch all users
        
        const allDoctors = await Doctor.find({})

        if(!allDoctors) {
            return res.status(401).json({
                success: false,
                message: "Doctors bucket is empty.",
            })
        }


        res.status(200).json({
            success: true,
            allDoctors,
            message: "All doctors are fetched successfully"
        })


    }
    catch (error) {
        res.send("something went wrong while fetching all Doctors...");
    }
}











module.exports = {signup, login, createDoctor, createAdmin, allPatients, allDoctors};