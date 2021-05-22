const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//becoz we are finding user from the database
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'  //encryption and decryption string it is the key
}

//user is alrealdy present in JWT we are just fetching out the id from the Payload and checking if the user is there or not
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){  //payload stores info about user
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){ console.log('Error in finding the user from JWT'); return;}

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;