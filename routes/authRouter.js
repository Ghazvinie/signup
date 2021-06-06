const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, dashboardGet, changePasswordPost } = require('../controllers/authController');
const { isUserAuth } = require('../middleware/jwtMiddleware');

authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', signInGet);

authRouter.post('/signin', signInPost);

authRouter.get('/dashboard', isUserAuth, dashboardGet);

authRouter.post('/changePassword', isUserAuth, changePasswordPost);

module.exports = authRouter;