 const User =require('../models/user') ;
  
  module.exports.profile=function(req,res){
      User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "User Profile",
            profile_user : user
       });
      });
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
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
    return res.render('user_sign_In',{
        title:"Codial | Sign In"
    })
}


//grt the sign up data
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

