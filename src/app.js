const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http')

require("dotenv").config();
require("./utils/cronjob");

const User = require('./models/user');
const { connectDB } = require('./config/database');
const { userSignupValidation } = require('./utils/validation');
const {userAuth} = require('./middleware/auth');
const {authRouter} = require('./routes/auth');
const {usersRouter} = require('./routes/users');
const {profileRouter} = require('./routes/profile');
const {requestsRouter} = require('./routes/requests');
const initializeSocket = require('./utils/socket')

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/', profileRouter);
app.use('/', requestsRouter);

const server =  http.createServer(app);
initializeSocket()
const port = process.env.PORT
connectDB().then(() => {
    console.log('Database connected successfully');
    server.listen(port, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Database connection failed', err);
});

app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send({ error: err.message, message: 'Internal Server Error' });
    }
})