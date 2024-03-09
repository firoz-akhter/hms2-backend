const Appointment = require("../models/Appointment");





async function addAppointment(req, res) {

    try {
        
        // data nikalo req body se
        // const {name, email, password, role} = req.body;
        const {doctor, patient, appointmentNumber, appointmentDate, scheduledDate} = req.body;
        
        

        const existingAppointment = await Appointment.findOne({doctor, patient, appointmentNumber}) // dekhte hai kaise find krna hai exact appointment

        

        if(existingAppointment) {
            res.status(400).json({
                success: false,
                message: "Appointment already exist",
            })
            console.log("number pehle se lag gaya hai...");
            return ;
        }

        // res.send("line number -->");

        const appointment = await Appointment.create({
            doctor, patient, appointmentNumber, appointmentDate, scheduledDate
        })

        

        console.log(appointment);

        res.status(200).json({
            success: true,
            message: "Appointment added Successfully..."
        })


    }
    catch(error) {
        res.send("something went wrong while adding appointment...");
    }

}



async function allAppointments(req, res) {

    try {
        // fetch all appointments
        
        const allAppointments = await Appointment.find({})

        if(!allAppointments) {
            return res.status(401).json({
                success: false,
                message: "Apointment bucket is empty.",
            })
        }


        res.status(200).json({
            success: true,
            allAppointments,
            message: "All appoinements are fetched successfully"
        })


    }
    catch (error) {
        res.send("something went wrong while fetching all appoinements...");
    }


}


async function deleteAppointment(req, res) {

    try {

        const {id} = req.body;
        
        // res.send(`sending id back to client ${id}`);
        const deletedDoctor = await Appointment.findByIdAndDelete({_id: id});

        // res.send("trying to delete doctor...")


        res.status(200).json({
            success: true,
            message: "apointment deleted Successfully...",
            deletedDoctor,
        })


    }
    catch (error) {
        res.send("something went wrong while deleting deleteDoctor...");
    }

}







module.exports = {addAppointment, allAppointments, deleteAppointment};