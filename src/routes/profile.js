const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { userAuth } = require('../middleware/auth');
const {validateUserUpdate} = require('../utils/validation');

const profileRouter = express.Router();

profileRouter.patch('/profile/update',userAuth, async (req, res) => {
    try{
        if(!validateUserUpdate(req, res)){
            throw new Error('Invalid request body');
        }

        const user = req.user;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.age = req.body.age || user.age;
        user.gender = req.body.gender || user.gender;
        user.skills = req.body.skills || user.skills;

        await user.save();

        res.status(200).send({
            message: 'Profile updated successfully',
            user: {
                firstName: user.firstName
            }
        });

    }
    catch(err){
        res.status(400).send(err.message);
    }
 
});

profileRouter.get('/profile',userAuth, async (req, res) => {
    let user = req.user;
    res.status(200).send(user);
});


module.exports = {profileRouter};