const bcrypt = require("bcrypt");
const Patient = require("../models/Patient");


async function deletePatient(req, res) {

    try {

        const {id} = req.body;

        
        // res.send(`sending id back to client ${id}`);
        const deletedPatient = await Patient.findByIdAndDelete({_id: id});

        // res.send("trying to delete doctor...")


        res.status(200).json({
            success: true,
            message: "patient deleted Successfully...",
            deletedPatient,
        })


    }
    catch (error) {
        res.send("something went wrong while deleting doctor...");
    }

}



async function updatePatient(req, res) {

    try {

        // const id = req.body._id;
        let id = req.params.id;
        id = id.slice(1, );
        // res.send(`${id}`);
        const {firstName, lastName, address, birthdate, email, mobileNumber, role, password} = req.body;

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

        const updatedPatient = await Patient.findByIdAndUpdate(
            {_id: id},
            {firstName, lastName, address, birthdate, email, mobileNumber, role, password: hashedPassword},
        );

        // res.send("trying to update doctor...")


        res.status(200).json({
            success: true,
            message: "patient updated Successfully...",
            updatedPatient,
        })


    }
    catch (error) {
        res.send("something went wrong while updating patient...");
    }

}



module.exports = {deletePatient, updatePatient}


