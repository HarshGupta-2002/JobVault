const express = require('express');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', jobRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
