const express = require('express');
require("dotenv").config();
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user_routes');
const carRouter = require('./routes/car_routes');
const ConnectDB = require('./database/db');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

ConnectDB();

app.use('/api', userRouter);  // Handle /api routes with userRouter
app.use('/car', carRouter);    // Handle /car routes with carRouter

app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});
