const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
// const routes = require('./routes');  // Thư mục routes chứa các route controllers
// const { errorHandler } = require('./middleware/error');
const path = require('path');

// Create Express app
const app = express();  

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


