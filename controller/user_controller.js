const User =require('../models/user') ;
const fs = require('fs');
const path = require('path');
const { check, sanitizebody } = require('express-validator');
 module.exports.profile=function(req,res){
     User.findById(req.params.id,function(err,user){
       return res.render('user_profile',{
           title: "User Profile",
           profile_user : user
      });
     });
}

module.exports.update= async function(req,res){

   // if(req.user.id==req.params.id){
   //     User.findByIdAndUpdate(req.params.id,req.body, function(err,user){
   //         return res.redirect('back');
   //     });
   // }else{
   //     return res.status(401).send('Unauthorized');
   // } 
   if(req.user.id==req.params.id){

       try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
            if(err){console.log('*****Multer Error:', err)}

            user.name = req.body.name;
            user.email = req.body.email;
            
            if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                  }

                // this is saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
            });


       }catch(err){
           req.flash('error', err);
           return res.redirect('back');
       }


   }else{
       req.flash('error', 'Unauthorized');
       return res.status(401).send('Unauthorized');
   }
}

//render sign in and sign out page
module.exports.signUp =function(req,res){
  if(req.isAuthenticated()){
    return  res.redirect('/users/profile');
  }

   return res.render('user_sign_up',{
       title:"Codial | Sign Up"
   })
}
module.exports.signIn =function(req,res){ 

   if(req.isAuthenticated()){
     return  res.redirect('/users/profile');
   }
   return res.render('user_sign_in',{
       title:"Codial | Sign In"
})
}

//grt the sign up data
// module.exports.form=[
//  check('password').trim().notEmpty().withMessage('Password required')
//     .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
//     .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
//     .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
//     .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
//     .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
//     .not().matches(/^$|\s+/).withMessage('White space not allowed'),
//     check('confirm_password').custom((value, { req }) => {
//         if (value !== req.body.password) {
//               throw new Error('Password Confirmation does not match password');
//          }
//          return true;
//     })
//  ]

module.exports.create =function(req,res){
   if(req.body.password !=req.body.confirm_password){
       req.flash('error', 'Password not matched! Try Again');
       return res.redirect('back');
       
   }
   User.findOne({email:req.body.email}, function(err, user){
       req.flash('success','THANK YOU for signing up!!');
       if(err){console.log('error in finding user in signing up'); return}
                    
       if(!user){
           User.create(req.body,function(err,user){
               if(err){console.log('error in creating user while signing up'); return}

               return res.redirect('/users/sign-in');

           })
       }else {
           return res.redirect('back');
       }
   });
}
//sign-in and create session for the user
module.exports.createSession =function(req,res){
   req.flash('success','Logged in Successfully');
   res.redirect('/');
}

module.exports.destroySession =function(req,res){
   req.logout();
   req.flash('success',' You have been Logged out!');
   
   res.redirect('/');
}

