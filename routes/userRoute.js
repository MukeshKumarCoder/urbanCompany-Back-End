const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.status(400).send("Something went wrong while hashing");
      } else {
        const user = new UserModel({ userName, email, password: hash });
        await user.save();
        res.status(200).send("New User has been created");
      }
    });
  } catch (error) {
    res.status(400).send({ msg: `${error} Register Faild` });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
       if(result){
        const token = jwt.sign({ course: 'backend' }, 'masai');
        res.status(200).send({msg: "Login successful", "Token": token});
       }else{
        res.status(200).send({msg: "wrong Password"});
       }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: `${error} login Faild` });
  }
});

module.exports = userRouter;
