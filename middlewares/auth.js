const jwt = require("jsonwebtoken")


function auth(req, res, next) {

    const JWT_SECRET = "Firoz";

    try {

        // extract jwt token
        const token = req.body.token;

        console.log(token);

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            })
        }

        // verify token
        try {
            const decode = jwt.verify(token, JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }
        next();


    }
    catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }


}


function isStudent(req, res, next) {
    try {

        if(req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Welcome to the protected route for students.",
            })
        }
        next();

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        })
    }
}


function isAdmin(req, res, next) {
    try {

        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for admin.",
            })
        }
        next();

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        })
    }
}




module.exports = {auth, isStudent, isAdmin};