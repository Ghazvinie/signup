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
        res.status(201).json({ user });
    } catch (err) {
        // Handle any errors
        const error = errorHandler(err);
        res.status(400).json({ error });
    }
}

async function signInGet(req, res) {
    res.render('signIn');
}
async function signInPost(req, res) {
    const { usernameEmail, password } = req.body;
    const $or = [{ email: usernameEmail }, { username: usernameEmail }];


    try {
        const user = await UserModel.findOne({ $or });
        const userValid = await bcrypt.compare(password, user.password);
        if (userValid) {
            const { username, email } = user;
            res.status(200).json({ username, password });
        }
    } catch (error) {
        // console.log(error);
    }
}
function dashboardGet(req, res) {
    res.render('dashboard');
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet };