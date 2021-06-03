const UserModel = require('../models/userSchema');

function signUpGet(req, res) {
    res.render('signUp');
}

function signUpPost(req, res) {
    res.send('SignUp Post');
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