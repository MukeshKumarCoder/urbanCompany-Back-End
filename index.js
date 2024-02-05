const express = require("express");
const dotenv = require("dotenv").config();
const  connection = require("./config/db");

const port = process.env.port;
const app = express();






app.listen(port, async()=>{
    try {
        await connection
        console.log(`app is running at ${port} and db is also connect`)
    } catch (error) {
        console.log(error)
    }
})