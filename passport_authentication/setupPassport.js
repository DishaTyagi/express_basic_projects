const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
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
        if(user.password !== password){
            return done(null, false)
        }

        done(null, user);
    })
    .catch(done)
}));


//for session,
passport.serializeUser((user, done) => {
    done(null, user.id);
});
//use of serialize user is that each subsequent request to the webpage will not contain the login credentials, but rather the unique cookie that identifies the session.
//here instead of passing whole user object into the done() second argument, we rather passed unique id thus keeping the amount of data stored in the session small.

passport.deserializeUser((userId, done) => {
    Users.findOne({
        where:{
            id: userId
        }
    })
    .then((user) => {
        done(null, user)
    })
    .catch(done)
})

module.exports = passport
