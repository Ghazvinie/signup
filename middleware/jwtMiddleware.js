const jwt = require('jsonwebtoken');
const fs = require('fs');
const UserModel = require('../models/userSchema');

const privateKey = fs.readFileSync('../keys/private.key', 'utf8');
const publicKey = fs.readFileSync('../keys/public.key', 'utf8');

function generateToken(id) {
    return jwt.sign({ id }, privateKey, {
        expiresIn: '24h',
        algorithm: 'RS512'
    });
}

function verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, publicKey, async (err, decodedToken) => {
            if (err) {
                // Handle error
                res.locals.user = null;
                next();
            } else {
                const user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { generateToken, verifyToken };