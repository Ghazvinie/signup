const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');

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

    } catch (error) {

    }

}

function signInGet(req, res) {
    res.render('signIn');
}
function signInPost(req, res) {
    res.send('SignIN Post');
}
function dashboardGet(req, res) {
    res.send('dashboard');
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet };