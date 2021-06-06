const jwt = require('jsonwebtoken');
const fs = require('fs');
const UserModel = require('../models/userSchema');

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');

function generateJWT(id) {
    try {
        return jwt.sign({ id }, 'secret', {
            expiresIn: '24h',
        });
    } catch (error) {
        console.log(error);
    }
}

function isUserAuth(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/auth/signin');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/auth/signin');
    }

}

function storeUserIfAuth(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
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

module.exports = { generateJWT, isUserAuth, storeUserIfAuth };