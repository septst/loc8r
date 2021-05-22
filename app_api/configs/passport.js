const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');
const user = require('../models/users');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    (username, password, done) => {
        user.findOne({email: username},
            (err, user) => {

                if(err){
                    return done(err);
                }
                
                if(!user){
                    return done(null, false, {message: 'The user name is incorrect.'});
                }

                if(!user.validatePassword(password)){
                    return done(null, false, {message: 'The password entered is incorrect.'})
                }

                return done(null, user);
            })
    }
));