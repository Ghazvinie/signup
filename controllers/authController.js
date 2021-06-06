const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateJWT} = require('../middleware/jwtMiddleware');



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
    res.render('signIn', { message: req.flash('user') });
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
            if (userValid) {
                const redirect = '/auth/dashboard';
                const {_id, username} = user;
                const token = generateJWT(_id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 3600 * 1000});

                req.flash('userDetails', username);
                // res.status(200).json({ redirect });
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
    res.render('dashboard', { message: req.flash('userDetails') });
}

function dashboardPost(req, res) {
    const { oldPassword, newPassword } = req.body;
    console.log(req.flash('userDetails'));

    res.render('dashboard', { message: req.flash('userDetails') });
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet, dashboardPost };