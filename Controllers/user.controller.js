const userModel = require("../Models/user.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const showWelcome = (req, res) => {
  res.send("Hello Node class");
};

const showRegister = (req, res) => {
  let newUser = new userModel(req.body);
  newUser.save().then((user) => {
    console.log("New user created");
  });
};

const signin = (req, res) => {
  let { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      user.comparedPassword(password, (err, isMatch) => {
        let schoolPortal = process.env.SECRET;
        console.log(isMatch);
        if (isMatch) {
          jwt.sign(
            { email },
            schoolPortal,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                console.log(token);
                res.send({ status: true, message: "User found", token: token });
              }
            }
          );
        } else {
          res.send({ status: false, message: "User not found" });
        }
      });
      console.log("user found");
    })
    .catch((err) => {
      console.log("user not found");
    });
};

const getDashboard = (req, res) => {
  let schoolPortal = process.env.SECRET;
  token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, schoolPortal, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  console.log("i dey work");
};
const sendMail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "oroladesunday@gmail.com",
      pass: "mrsfpanazufwermz",
    },
  });
  let mailOptions = {
    from: "oroladesunday@gmail.com", // sender address
    to: "oroladesunday@gmail.com, saorolade@student.lautech.edu.ng", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error){
        console.log(error);
        res.send({ status: false, message: "user not created"})
    }else {
        console.log("Email sent: " + info.response);
        res.send({ status: true, messages: "User created"})
    }
  });
};

module.exports = { showWelcome, showRegister, signin, getDashboard, sendMail };
