const UserModel = require('../models/userSchema');


function signUpPost(req, res) {
    const {username, email, password} = req.body;
    console.log(username, email, password);

}

module.exports = { signUpPost };