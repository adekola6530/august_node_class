const express = require("express")
const router = express.Router()
const {showWelcome, showRegister, signin, getDashboard} = require ("../Controllers/user.controller")

router.get("/welcome", showWelcome)
router.post("/register", showRegister)
router.post("/signin", signin)
router.get("/dashboard", getDashboard)




module.exports = router