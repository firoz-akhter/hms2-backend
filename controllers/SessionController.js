const Session = require("../models/Session");




async function addSession(req, res) {

    try {
        
        // data nikalo req body se
        // const {name, email, password, role} = req.body;
        const title = req.body.sessionTitle;
        const doctor = req.body.doctor;
        const date = req.body.sessionDate;
        const time = req.body.sessionTime;
        const maxBooking = req.body.numOfPatients;

        res.send({time});
        console.log("time is: ", time);
 


        const existingSession = await Session.findOne({doctor, date}) // dekhte hai kaise find krna hai exact session
        // upar findOne { } object me thodi problem hai dekhna hai
        if(existingSession) {
            res.status(400).json({
                success: false,
                message: "Session already Scheduled",
            })
            return ;
        }

        // res.send("trying to add session again....")

        const session = await Session.create({
           title, doctor,  date, time, maxBooking,
        })


        console.log(session);

        res.status(200).json({
            success: true,
            message: "Session added Successfully..."
        })


    }
    catch(error) {
        res.send("something went wrong while adding this session...");
    }


}


async function allSessions(req, res) {

    try {
        // fetch all appointments
        
        const allSessions = await Session.find({})

        if(!allSessions) {
            return res.status(401).json({
                success: false,
                message: "Session bucket is empty.",
            })
        }


        res.status(200).json({
            success: true,
            allSessions,
            message: "All Sessions are fetched successfully"
        })


    }
    catch (error) {
        res.send("something went wrong while fetching all Sessions...");
    }


}

async function deleteSession(req, res) {

    try {

        const {id} = req.body;
        
        // res.send(`sending id back to client ${id}`);
        const deletedDoctor = await Session.findByIdAndDelete({_id: id});

        // res.send("trying to delete doctor...")


        res.status(200).json({
            success: true,
            message: "session deleted Successfully...",
            deletedDoctor,
        })


    }
    catch (error) {
        res.send("something went wrong while deleting session...");
    }

}





module.exports = {addSession, allSessions, deleteSession};