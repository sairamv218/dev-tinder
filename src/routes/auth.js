const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

const { userSignupValidation } = require('../utils/validation');
const User = require('../models/user');

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('Invalid Credentials');
        }

        // console.log('User found:', user);
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid Credentials');
        }

        const token = await user.getJWP();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

authRouter.post('/signup', async (req, res, next) => {
    console.log(req.body);
    try{

        userSignupValidation(req, res, next);

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        password: passwordHash
    })

    await user.save().then(() => {
        res.status(201).send('User created successfully');
    })
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

authRouter.post('/logout', async (req, res) => {
    // res.clearCookie('token');
    res.cookie('token', null, { expires: new Date(Date.now()) });
    res.status(200).send('Logout successful');  
})

module.exports = {authRouter};