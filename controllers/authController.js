const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');


function signUpGet(req, res) {
    res.status(200).render('signUp');
}

// User sign up
async function signUpPost(req, res) {

    // Get form data
    const { username, email, password } = req.body;
    const isAdmin = req.body.isAdmin ? true : false;

    try {
        // Save user to database
        const user = await UserModel.create({ username, email, password, isAdmin });
        const redirect = '/auth/signin';
        req.flash('user', user.username);
        res.status(201).json({ redirect });
    } catch (error) {
        // Error with saving to database
        const err = errorHandler(error);
        // Pass error on
        res.status(400).json({ err });
    }
}

async function signInGet(req, res) {
    res.render('signIn', {message: req.flash('user')});
}

// User sign in POST
async function signInPost(req, res) {
    const { usernameEmail, password } = req.body;
    // Allow for searching by username or email
    const $or = [{ email: usernameEmail }, { username: usernameEmail }];


    try {
        // Find user
        const user = await UserModel.findOne({ $or });
        // Hash password
        if (user) {
            const userValid = await bcrypt.compare(password, user.password);
            // If password valid
            if (userValid) {
                const redirect = '/auth/dashboard';
                const { username, email } = user;

                res.status(200).json({ username, email, redirect });
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
function dashboardGet(req, res) {
    res.render('dashboard');
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet };