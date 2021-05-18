//to pass on messages on the user_controller to the ejs
module.exports.setFlash= function(req,res,next){
    res.locals.flash={
        'success': req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}