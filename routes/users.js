const express=require('express');
const { Passport } = require('passport');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controller/user_controller');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google/', passport.authenticate('google', {scope: ['profile', 'email']}));       //not a callback url, it is given by passport
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}),usersController.createSession);




module.exports=router;
