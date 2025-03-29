// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup, 
  changePassword,
} = require("../controllers/Auth")


const { auth } = require("../middlewares/auth")   

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)


// Route for Changing the password
router.post("/changepassword", auth, changePassword)


module.exports = router