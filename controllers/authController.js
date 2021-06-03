const UserModel = require('../models/userSchema');

function signUpGet(req, res) {
    res.render('signUp');
}

async function signUpPost(req, res) {
    const { username, email, password } = req.body;

    try {
        await UserModel.create({username, email, password}, (err) => {
            if (err) console.log(err);
            res.json('hello')
        });
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