const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/user');
 
//tell passport to use new stragegy to login
passport.use(new googleStrategy({
    clientID: "698661915476-cvi9sc2jo4nn22tgn68gm0cgunmohjco.apps.googleusercontent.com",
    clientSecret : "8PNnO6GJ7aPI5eFTqIpy88W3",
    callbackURL : "http://localhost:3000/users/auth/google/callback",
    },
     function(accessToken, refreshToken, profile, done){
         //find a user
         User.findOne({email : profile.emails[0].value}).exec(function(err , user){
             if(err){console.log('error in google-stragegy-passport', err); return ;}

             console.log(profile);

             if(user){
                 //if found set this user as req.user
                 return done(null, user);
             }else{
                 //if not found , create the user and set it as req.user i.e signin that user
                 User.create({
                     name: profile.displayName,
                     email : profile.emails[0].value,
                     password : crypto.randomBytes(20).toString('hex') //generating the random password
                 } , function(err, user){
                    if(err){console.log('error in google-stragegy-passport', err); return ;}

                    return done(null , user);
                 });
             }
         });
     }

));

module.exports = passport;