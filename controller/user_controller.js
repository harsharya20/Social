module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title: "User"
   });
}
//render sign in and sign out page
module.exports.signUp =function(req,res){
    return res.render('user_sign_up',{
        title:"Codial | Sign Up"
    })
}
module.exports.signIn =function(req,res){
    return res.render('user_sign_In',{
        title:"Codial | Sign In"
    })
}

//grt the sign up data
module.exports.create =function(req,res){
    //LAter
}
//sign-in and create session for the user
module.exports.createSession =function(req,res){
    //later
}