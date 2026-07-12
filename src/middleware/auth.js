const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        console.log('Cookie received in auth middleware:', cookie);
        const idfromdecodedToken = jwt.verify(cookie.token, 'devtinder@2026');
        console.log('Decoded token in auth middleware:', idfromdecodedToken);
        let user = await User.findById(idfromdecodedToken._id);

        console.log('User found in auth middleware:', user);
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user; // Attach the user object to the request for further use
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = { userAuth};