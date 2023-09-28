const express = require("express")
const router = express.Router()
const {showWelcome, showRegister, signin, getDashboard, sendMail } = require ("../Controllers/user.controller")

router.get("/welcome", showWelcome)
router.post("/register", showRegister)
router.post("/signin", signin)
router.get("/dashboard", getDashboard)
router.get("/sendmail", sendMail)





module.exports = router