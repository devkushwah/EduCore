
const User =  require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


//resetPasswordToken

exports.resetPasswordToken = async (req, res) => {
    
    try {
        
        //get email form req body
        const email = req.body.email;
        // console.log("typeeeeeeeee" + typeof email, email);


        //check user for this email, email valiadtion
        const user = await User.findOne({email: email});

        if(!user) {
            return res.json({
                success: false,
                message: "Your email is not ragistered with us" 
            });
        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate(
                                          {email: email},
                                          {
                                            token: token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                          },
                                          {new: true} );
        
        // create URL
        const url = `http://localhost:3000/update-password/${token}`
        
        // send mail containing the URL
        await mailSender(email,
                         "Password Reset Link",
                         `Password Reset Link: ${url} ` );

        // return response
        return res.json({
            success: true,
            message: "Email sent successfully, please check email and change password"
        });                 
        
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wwent wrong, while sending reset password mail"
        })
    }
}


// resetPassword
exports.resetPassword = async (req, res) => {

    try {
        
        // fetch data
        const { password, confirmPassword, token } = req.body;

        // validation
        if(password !== confirmPassword) {
            return res.json({
                sucsess: false,
                message: 'Password not matching'
            });
        }

        // get userDetails from DB using token
        const userDetails = await User.findOne({token: token});
        
        // if no existance - invalid token
        if(!userDetails) {
            return res.json({
                success: false,
                message: 'Token is invalid'
            })
        }

        // Check Token Time
        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired"
            });

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Password Update
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true}
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successful"
        }); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while sending reset password mail"
        })
    }
}