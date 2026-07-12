const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://example.com/default-profile-picture.jpg'
    },
    skills:{
        type: [String]
    }
},
{
    timestamps: true
});

userSchema.methods.getJWP = async function() {
    const token = await jwt.sign({ _id: this._id }, 'devtinder@2026', { expiresIn: '1h' });
    return token;
};

userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;