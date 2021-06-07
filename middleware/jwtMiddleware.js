const jwt = require('jsonwebtoken');
const fs = require('fs');
const UserModel = require('../models/userSchema');

// Access private and public keys
const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');

// Generate JWT for user on route which this called
function generateJWT(id) {
    try {
        return jwt.sign({ id }, 'secret', {
            expiresIn: '24h',
        });
    } catch (error) {
        throw Error ('Generating JWT failed');
    }
}

// Check if current user is authorised for route on which this is called
function isUserAuth(req, res, next) {
    // Get token
    const token = req.cookies.jwt;

    if (token) {
        // If token exists
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                // Verification fails, redirect to signin
                req.session.notSignedIn = true;
                res.redirect('/auth/signin');
            } else {
                // Verification passes, call next middleware
                next();
            }
        });
    } else {
        // Token doesn't exist (verifcation fails), redirect to signin
        req.session.notSignedIn = true;
        res.redirect('/auth/signin');
    }
}

// Store user details to locals
function storeUserIfAuth(req, res, next) {
    // Get token
    const token = req.cookies.jwt;
    if (token) {
        // If token exists
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                // Verifcation fails, reset locals.user
                res.locals.user = null;
                next();
            } else {
                // Verifcation passes, get user from database
                const user = await UserModel.findById(decodedToken.id);
                // Store user to locals.user
                res.locals.user = user;
                next();
            }
        });
    } else {
        // Token doesn't exist (verifcation fails), reset locals.user
        res.locals.user = null;
        next();
    }
}

module.exports = { generateJWT, isUserAuth, storeUserIfAuth };