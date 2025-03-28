// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
    try {
       // Extract JWT token 
    //    console.log(req.body);
    //    console.log("cookies", req.cookies?.token)
    //    console.log("body", req.body?.token)
    //    console.log("header", req.header("Authorization"))
       
       // 1. Get token from request
       const token = req.cookies?.token || 
                    req.body?.token || 
                    req.header("Authorization")?.replace("Bearer ", "");  // Fixed space after Bearer

        // Remove any quotes from the token if present
        const cleanToken = token?.replace(/^["'](.*)["']$/, '$1');

        console.log("Extracted Token:", token);
        console.log("Cleaned Token:", cleanToken);
        
        // If JWT is missing, return 401 Unauthorized response
        if (!cleanToken) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verifying the JWT using the secret key stored in environment variables
        try {
            console.log("Actual JWT_SECRET value:", JSON.stringify(process.env.JWT_SECRET));
            console.log("JWT_SECRET length:", process.env.JWT_SECRET.length);
            console.log("JWT_SECRET in auth middleware:", process.env.JWT_SECRET); 
            console.log("Token being verified:", cleanToken);
            
            // Add more detailed token inspection
            const tokenParts = cleanToken.split('.');
            if (tokenParts.length !== 3) {
                console.error("Token format is invalid - doesn't have 3 parts");
            }
            
            const decoded = jwt.verify(cleanToken, process.env. JWT_SECRET);
            console.log("Decoded JWT:", decoded);

            // Storing the decoded JWT payload in the request object for further use
            req.user = decoded;
        } catch (error) {
            // If JWT verification fails, return 401 Unauthorized response
            console.error("JWT Verification Error:", error.message);
            console.error("JWT Verification Error Type:", error.name);
            
            return res.status(401).json({
                success: false,
                message: error.message.includes("jwt expired") 
                    ? "Token has expired" 
                    : "Token is invalid",
            });
        }

        // If JWT is valid, move on to the next middleware or request handler
        next();

    } catch (error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

// Middleware for checking if the user is a student
exports.isStudent = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This route is protected for Students only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, please try again",
        });
    }
};

// Middleware for checking if the user is an instructor
exports.isInstructor = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This route is protected for Instructors only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, please try again",
        });
    }
};

// Middleware for checking if the user is an admin
exports.isAdmin = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This route is protected for Admins only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, please try again",
        });
    }
};
