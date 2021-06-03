const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');

function signUpGet(req, res) {
    res.status(200).render('signUp');
}

// User sign up
async function signUpPost(req, res) {
    // Get form data
    const { username, email, password } = req.body;
    const  isAdmin  = req.body.isAdmin ? true : false;
    console.log(isAdmin);

    try {
        // Save user to database
        // await UserModel.create({ username, email, password, isAdmin }, (err) => {
        //     if (err) {
        //         // --------------- ADD ERROR HANDLING ---------------------
        //         console.log(err);
        //     }
        
        // });
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