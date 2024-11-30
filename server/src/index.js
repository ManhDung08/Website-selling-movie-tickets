const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const routes = require('./routes');  // Thư mục routes chứa các route controllers
const { errorHandler } = require('./middleware/error');
const path = require('path');

// Load env vars
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get("/", (req, res) => {
  res.send("Welcome to Movie Ticket Booking API!");
});