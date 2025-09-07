/*
STEP 1: Basic Setup
- Express app create karna
*/
const express = require("express");
const app = express();

/*
STEP 2: Configuration Setup
- Database configuration import
- Third-party middlewares import (cookie-parser, cors, cloudinary, file-upload)
- Environment variables setup (.env file se PORT number fetch)
*/
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

/*
STEP 3: Database Connection
- MongoDB se connection establish karna
*/
database.connect();

/*
STEP 4: Middleware Setup
- JSON parsing enable karna
- Cookie parsing enable karna
- CORS policy setup (frontend se communication ke liye)
- File upload configuration
*/
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      /\.vercel\.app$/, // allow all vercel.app subdomains 
      'https://edu-core-git-main-dev-kushwahs-projects.vercel.app',
      'https://edu-core-omega.vercel.app',
    ],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/*
STEP 5: Cloudinary Connection
- Image/Video upload ke liye cloudinary se connect karna
*/
cloudinaryConnect();

/*
STEP 6: Routes Import
- Saare route files ko import karna (User, Profile, Payment, Course, Contact)
*/
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

/*
STEP 7: Routes Setup
- Har ek feature ke liye specific routes set karna
- /api/v1 prefix ke saath routes define karna
*/
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

/*
STEP 8: Default Route
- Basic health check endpoint
- Server running hai ya nahi check karne ke liye
*/
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});


if (require.main === module) {
  // Server running directly (local development)
  app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
  });
} else {
  // Export app for Vercel
  module.exports = app;     
}

