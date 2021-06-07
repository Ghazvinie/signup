const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, dashboardGet, changePasswordPost, signOutGet } = require('../controllers/authController');
const { isUserAuth } = require('../middleware/jwtMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');

authRouter.get('/signup', csrfProtection, signUpGet);

authRouter.post('/signup', csrfProtection, signUpPost);

authRouter.get('/signin', csrfProtection, signInGet);

authRouter.post('/signin', csrfProtection, signInPost);

authRouter.get('/dashboard', csrfProtection, isUserAuth, dashboardGet);

authRouter.post('/changePassword', csrfProtection, isUserAuth, changePasswordPost);

authRouter.get('/signout', signOutGet);

module.exports = authRouter;