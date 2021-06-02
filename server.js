const express = require('express');
const authRouter = require('./routes/authRouter');

// Initialise app
const app = express();

// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Set static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('signup');
});

app.use('/auth', authRouter);

app.listen(3000);