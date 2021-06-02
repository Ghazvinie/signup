const authRouter = require('express').Router();
const { signUpPost } = require('../controllers/authController');

authRouter.post('/signup', signUpPost);

module.exports = authRouter;