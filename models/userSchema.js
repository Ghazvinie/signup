const mongoose = require('mongoose');
const { isEmail } = require('validator');

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
        required: [true, 'Password required']
    }
});

module.exports = UserSchema;