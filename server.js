const express = require('express');
const authRouter = require('./routes/authRouter');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('signup');
});

app.use('/auth', authRouter);

app.listen(3000);