const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username required'],
        unique: [true, 'Username already taken']
    },

    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email already used'],
        validate: [isEmail, 'Invalid email']
    },

    password: {
        type: String,
        required: [true, 'Password required'],
        minLength: [6, 'Password must be at least 6 characters long'],
        maxLength: [25, 'Password length exceeded']
    }
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});




const UserModel = mongoose.model('ssUser', UserSchema);

module.exports = UserModel;