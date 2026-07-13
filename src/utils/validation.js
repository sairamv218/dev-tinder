const validate = require('validator');

const userSignupValidation = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        throw new Error('Please provide all required fields: firstName, lastName, email, and password');
    }

    if (!validate.isEmail(email)) {
        throw new Error('Invalid Email');
    }

    if (!validate.isStrongPassword(password)) {
        throw new Error('Please provide a strong password with at least 8 characters, including uppercase, lowercase, number, and symbol');
    }
};

const validateUserUpdate = (req, res, next) => {
    const allowedFields = ['firstName', 'lastName', 'age', 'gender', 'skills'];

    const isEditAlowed = Object.keys(req.body).every((field) => allowedFields.includes(field));

    return isEditAlowed;
}

module.exports = { userSignupValidation,validateUserUpdate };