const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    versionKey: false,
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;