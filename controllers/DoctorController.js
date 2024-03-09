const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");


async function deleteDoctor(req, res) {

    try {

        const {id} = req.body;

        
        // res.send(`sending id back to client ${id}`);
        const deletedDoctor = await Doctor.findByIdAndDelete({_id: id});

        // res.send("trying to delete doctor...")


        res.status(200).json({
            success: true,
            message: "doctor deleted Successfully...",
            deletedDoctor,
        })


    }
    catch (error) {
        res.send("something went wrong while deleting doctor...");
    }

}



async function updateDoctor(req, res) {

    try {

        // const id = req.body._id;
        let id = req.params.id;
        id = id.slice(1, );
        // res.send(`${id}`);
        const {firstName, lastName, address, birthdate, email, mobileNumber, role, specialities, password} = req.body;

        // res.send(`sending the id back to client ${id}`)
        // res.send(req.body);


        
        // res.send(`sending id back to client ${id}`);
        // res.send("trying to update doctor")

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

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            {_id: id},
            {firstName, lastName, address, birthdate, email, mobileNumber, role, specialities, password: hashedPassword},
        );

        // res.send("trying to update doctor...")


        res.status(200).json({
            success: true,
            message: "doctor updated Successfully...",
            updatedDoctor,
        })


    }
    catch (error) {
        res.send("something went wrong while updating doctor...");
    }

}



module.exports = {deleteDoctor, updateDoctor}


