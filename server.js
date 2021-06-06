const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {verifyUserJWT} = require('./middleware/jwtMiddleware');


// Router
const authRouter = require('./routes/authRouter');

// Initialise app
const app = express();

// Connect to DB and server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connected to the database...');
        app.listen(3000, () => console.log('Server is listening on port 3000...'));
    })
    .catch(error => console.log('Database connection error' + error));

// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Connect flash
app.use(flash());

// Express session
app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true
    })
  );

// Set static files
app.use(express.static(__dirname + '/public'));

// Verify user's JWT on all routes
app.use('*', verifyUserJWT);

// Root route
app.get('/', (req, res) => {
    res.render('index');
});

// /auth routes
app.use('/auth', authRouter);

