const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateJWT } = require('../middleware/jwtMiddleware');


// User sign up GET
function signUpGet(req, res) {
    res.status(200).render('signUp', { csrfToken: req.csrfToken() });
}

// User sign up POST
async function signUpPost(req, res) {

    // Get form data
    const { username, email, password } = req.body;
    const isAdmin = req.body.isAdmin ? true : false;

    try {
        // Save user to database
        const user = await UserModel.create({ username, email, password, isAdmin });
        // Set redirect url
        const redirect = '/auth/signin';
        // Store username in flash
        req.flash('user', user.username);
        res.status(201).json({ redirect });
    } catch (error) {
        // Error with saving to database
        const err = errorHandler(error);
        // Pass error on
        res.status(400).json({ err });
    }
}

// User sign in GET
async function signInGet(req, res) {
    // Set notSignedIn to false for any falsey value
    const notSignedIn = req.session.notSignedIn ? true : false;
    // Reset notSignedIn on req.session
    req.session.notSignedIn = false;
    // Render signIn view
    res.render('signIn', { message: req.flash('user'), csrfToken: req.csrfToken(), notSignedIn });

}

// User sign in POST
async function signInPost(req, res) {
    const { usernameEmail, password } = req.body;
    // Allow for searching by username or email
    const $or = [{ email: usernameEmail }, { username: usernameEmail }];


    try {
        // Find user
        const user = await UserModel.findOne({ $or });
        if (user) {
            // Check encrypted password
            const userValid = await bcrypt.compare(password, user.password);
            // If passwords match
            if (userValid) {
                // Set redirect url
                const redirect = '/auth/dashboard';
                const { _id, username } = user;
                // Generate JWT for user
                const token = generateJWT(_id);
                // Store JWT in cookie
                res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600 * 1000, sameSite: 'lax' });
                // Set flash message
                req.flash('userDetails', username);
                res.status(200).json({ redirect });
            } else {
                // Password invalid
                throw Error('Incorrect password');
            }
        } else {
            // User doesn't exist / incorrect username or password
            throw Error('Incorrect username or email');
        }
    } catch (error) {
        // Handles error
        const err = errorHandler(error);
        // Pass error on
        res.json({ err });
    }
}

// Dashboard GET
function dashboardGet(req, res) {
    res.render('dashboard', { message: req.flash('userDetails'), csrfToken: req.csrfToken() });
}

// Dashboard POST - change password
async function changePasswordPost(req, res) {
    const { oldPassword, newPassword } = req.body;
    const { _id } = res.locals.user;

    try {
        // Find user
        const user = await UserModel.findById(_id);
        if (user) {
            // Check passwords match
            const userValid = await bcrypt.compare(oldPassword, user.password);
            if (userValid) {
                // Update password and save
                user.password = newPassword;
                user.save();
                res.json({ user });
            } else {
                throw Error('Incorrect password');
            }
        } else {
            throw Error('User not valid');
        }
    } catch (error) {
        // Handles error
        const err = errorHandler(error);
        // Pass error on
        res.json({ err });
    }
}

// Sign out GET
function signOutGet(req, res) {
    // Clear session, jwt cookie and locals store of user
    req.session = null;
    res.clearCookie('jwt');
    res.locals.user = '';
    res.redirect('/');
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet, changePasswordPost, signOutGet };