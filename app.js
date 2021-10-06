const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const hbs = require('express-handlebars');
app.use(express.static('public'));
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    defaultLayout: 'index',
    extname: 'hbs',
}));

// Connect to MongoDB
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Connected to MongoDB`);
    })
    
//=======================
//      R O U T E S
//=======================

app.get('/', (req, res, next) => {
    res.render('main');
});

// Login
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    res.render('user');
})

// Signup
app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    res.render('login')
})


// Run server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`))
