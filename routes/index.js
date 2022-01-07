const express =require('express');
const router=express.Router();
const homeController=require('../controller/home_controller');
const signinController=require('../controller/user_controller');

console.log('router is loaded');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
//router.use('/friendships', require('./friendships'));

router.use('/api' , require('./api'));

//for any furhter rotes,access from here
//router.use('/routername',require('./routerfile));
module.exports=router;

