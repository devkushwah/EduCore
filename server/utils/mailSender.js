const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
    try {
        console.log("Attempting to send email to:", email);
        console.log("Using SMTP host:", process.env.MAIL_HOST);
        console.log("Using email sender:", process.env.MAIL_USER);
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 587, // Added port configuration with fallback to 587
           
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true,
            logger: true
        })

        let info = await transporter.sendMail({
            from: '"Educore | DevAcademy" <dev.kushwah444446@gmail.com>',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
            envelope: {
                from: 'dev.kushwah444446@gmail.com',
                to: email
            }
        })
        
        console.log("Email sent successfully to:", email);
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
        return info;

    } catch (error) {
        console.error("Mail error details:", error);
        console.error("Error stack:", error.stack);
        return {success: false, error: error.message};
    }
}

module.exports = mailSender;