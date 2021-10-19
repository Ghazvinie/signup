const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { storeUserIfAuth } = require('./middleware/jwtMiddleware');


// Initialise app
const app = express();

const PORT = process.env.PORT || 3001

// Connect to DB and server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to the database...');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
  })
  .catch(error => console.log('Database connection error' + error));

  // Router
const authRouter = require('./routes/authRouter');

// Set view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');

// Set static files
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Connect flash
app.use(flash());

// Express session
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    cookie: {
      maxAge: 24 * 3600 * 1000,
      sameSite: 'lax'
    }
  })
);

// Verify user's JWT on all routes
app.use('*', storeUserIfAuth);

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

// /auth routes
app.use('/auth', authRouter);

app.get('*', (req, res) => {
  res.render('index');
});