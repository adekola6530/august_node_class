const userModel = require("../models/user.model")
// const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken") 
require("dotenv").config()




const showWelcome = (req, res) =>{
    res.send("Hello Node class")
}

const showRegister =(req, res)=>{
   
    let newUser = new userModel(req.body);
    newUser.save().then((user)=>{
        console.log("New user created");
    })
}

const signin = (req, res)=>{
    let {email,password} =req.body
    userModel.findOne({email:email})
    .then((user)=>{
        user.comparedPassword(password, (err, isMatch) => {
            let schoolPortal = process.env.SECRET
            console.log(isMatch);
            if (isMatch) {
            jwt.sign({ email}, schoolPortal, { expiresIn: '1h'}, (err, token)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log(token);
                    res.send({ status:true, message: "User found", token: token})
                }
            })  
            }else{
                res.send({ status: false, message: "User not found"})
            }
        })
        console.log("user found");
    })
    .catch((err)=>{
        console.log("user not found");
    })
}

const getDashboard =(req, res)=>{
    let schoolPortal = process.env.SECRET
    token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, schoolPortal, (err, result)=>{
        if(err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
 console.log("i dey work");
}

module.exports = {showWelcome, showRegister, signin, getDashboard}