const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, dashboardGet, dashboardPost } = require('../controllers/authController');

authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', signInGet);

authRouter.post('/signin', signInPost);

authRouter.get('/dashboard', dashboardGet);

authRouter.post('/dashboard', dashboardPost);

module.exports = authRouter;