const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const Profile = require("../models/Profile")
require("dotenv").config()



// Signup Controller for Registering USers
exports.signup = async (req, res) => {
    
    try {
    // Destructure fields from the request body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;

    // Check if All Details are there or not
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
        return res.status.json(400)({
            success: false,
            message: "All fields are required"
        })
    }
    console.log("All fields are there");

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
      console.log("Password and Confirm Password Matched");

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists. Please sign in to continue.",
    })
  }
  console.log("User does not exist");
    // Find most recent OTP stored for user
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);

    // Validate otp
    if(recentOtp.length === 0){
        // OTP not found for the email
        return res.status(400).json({
            success: false,
            message: "OTP is not valid"
        })
    } else if (otp !== recentOtp[0].otp) {
        // Invalid otp
        return res.status(400).json({
            success: false,
            message: "The otp is not invalid" 
        })
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
     console.log("Password Hashed");

    // Create the user
    let approved = accountType === "Instructor" ? false : true;
    console.log("User Created");

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null
    });
    console.log("Profile Created");

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType,
        approved: approved,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    console.log("User Created");

    // resturn response
    return res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        user,
    });
    

    } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
      }


}

// Login controller for authenticating users
exports.login = async (req, res) => {

   try {
    
    // Get email and password from request body
     const { email, password }  = req.body;

    // Check if email or password is missing
    if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }

    // Find user with provided email
    const user = await User.findOne({email}).populate("additionalDetails");

    // If user not found with provided email
    if(!user) {
        return res.status(401).json({
            success: false,
            message: `User is not Registered with Us Please SignUp to Continue`,

        })
    }
    // Generate JWT token and Compare Password
    if(await bcrypt.compare(password, user.password)) {
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

      // Save token to user document in database
        user.token = token;
        user.password = undefined;

      // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in Successfully"
        })
    }  else {
        return res.status(401).json({
            success: false,
            message: "Password is incorrect"
        });
    }
    
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Login Failure please try again"
    });
   }

};

