const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require("./config/database");
const dotenv = require('dotenv');
dotenv.config();


// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Test route
app.get('/', (req, res) => {
  res.send('EduCore API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
