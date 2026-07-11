const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
     gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;