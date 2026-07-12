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

module.exports = { userSignupValidation };