const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, dashboardGet, changePasswordPost, signOutGet } = require('../controllers/authController');
const { isUserAuth } = require('../middleware/jwtMiddleware');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: false });

authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', csrfProtection, signInGet);

authRouter.post('/signin', csrfProtection, signInPost);

authRouter.get('/dashboard', isUserAuth, dashboardGet);

authRouter.post('/changePassword', csrfProtection, isUserAuth, changePasswordPost);

authRouter.get('/signout', signOutGet);

module.exports = authRouter;