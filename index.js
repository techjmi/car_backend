const express = require('express');
require("dotenv").config();
const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/user_routes');
const carRouter = require('./routes/car_routes');
const ConnectDB = require('./database/db');

const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    // origin: "https://car-list-j0gy.onrender.com"
    // origin:"http://localhost:5173"
    origin:true
}));

// Connect to the database
ConnectDB();

// Route setup
app.use('/api', userRouter);
app.use('/car', carRouter);

// Start server
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});
