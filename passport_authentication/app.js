const express = require('express');
const session = require('express-session');
const {db, Users} = require('./db');
const passport = require('./setupPassport');
const flash = require("connect-flash");

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());    //recognizes incoming request as JSON object
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(
    session({
        secret: 'shhh. fir koi hai',
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge: 1000*60*60      //in milliseconds
        }
    })
)

//must come after session middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

app.get('/signup', (req,res) => {
    res.render('signup');
});

app.post('/signup', (req,res) => {
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((user) => {
        console.log(user);
        res.redirect('/login');
    })
    .catch((err) =>{
        console.error(err);
        res.redirect('/signup');
    })
});

app.get('/login',(req,res) =>{
    res.render('login');
});

app.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: "Invalid ..."
    })
)

function checkLoggedIn(req,res,next){
    if(req.user){
        return next();
    }    
    res.redirect('/login');
}

app.get('/profile', checkLoggedIn, (req,res) =>{
    res.render("profile");
})

db.sync().then(() => {
    app.listen(3000, () =>{
        console.log("Server started on port 3000");
        
    })
})



