const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const routes = require('./routes');  // Thư mục routes chứa các route controllers
const { errorHandler } = require('./middleware/error');

// Load env vars
dotenv.config({path: '/server/src/.env'});

// Create Express app
const app = express();

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
