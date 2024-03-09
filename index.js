const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user.js");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();


const app = express();


// middleware to parse json req body
// app.use(express.json());
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
    })
)


// db connect
const connectDb = () => {
    mongoose.connect(process.env.DATABASE_URL) 
    .then(() => {
        console.log('Connected to mongoDB database...')
    })
    .catch((error) => {
        console.log("Issue in DB Connection.")
        console.error(error.message)
        process.exit(1);
    })
}
connectDb();





// use the router
// const administratorRoutes = require("./routes/administrater.js");

app.use("/", user);


app.get("/", (req, res) => {
    res.send("hello there");
})



app.listen(3001, () => {
    // res.send("hello there")
    console.log("listening on port 3000");
})


