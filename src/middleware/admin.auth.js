const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === 'Bearer admin-token') {
        next();
    }   else {  
        res.status(401).send('Unauthorized');
    }
}

module.exports = adminAuth;