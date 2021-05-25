const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create= async function(req,res){
    try{
       let post= await Post.create({
            content:req.body.content,
            user: req.user._id  
            });

              if(req.xhr){      //check if the req is AJAX request
                //if we populate just the name of the user(we'll not have to send the password to the API),this is how we do it
                post= await post.populate('user', 'name').execPopulate();
                            
                  return res.status(200).json({           //return JSON with status
                       data:{
                           post : post
                       },
                       message : "Post created!"
                  });           
              }                                

            req.flash('success', 'Post Published!');
            return res.redirect('back');
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
 
}

module.exports.destroy = async function(req,res){

    try{
        let post= await Post.findById(req.params.id);
        
        // .id means converting the object id into string automatically done by mongoDB
        if(post.user == req.user.id){

            //delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();
    
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){ 
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }
            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete others posts ');
            return res.redirect('back');
        }
    }
    
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}
