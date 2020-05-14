const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const {Users} = require('./db');

passport.use(new localStrategy((username, password, done) => {
    Users.findOne({
        where:{
            username: username
        }
    })
    .then((user) => {
        if(!user){
            return done(new Error('Username Invalid'));
        }
        if(user.password != password){
            return done(null, false)
        }

        done(null, user);
    })
    .catch(done)
}));

//facebook
passport.use(new facebookStrategy({
    clientID: '619217788951490',
    clientSecret: '1512e9772d33b1c16d2b8c3d9a02d3f4',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function(accessToken, refreshToken, profile, done){
        Users.findCreateFind({
            where: {
                username: profile.id
            },
            defaults: {
                username: profile.id,
                fbAccessToken: accessToken
            }
        })
        .then((user) => {
            done(null,user)
        })
        .catch(done)
    }
));


//for session,
passport.serializeUser((user, done) => {
    done(null, user);
});
//use of serialize user is that each subsequent request to the webpage will not contain the login credentials, but rather the unique cookie that identifies the session.
//here instead of passing whole user object into the done() second argument, we rather passed unique id thus keeping the amount of data stored in the session small.

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports = passport
