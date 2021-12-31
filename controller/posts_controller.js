const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user');


module.exports.create = async function(req,res){
        try{
          let post = await Post.create({
        content: req.body.content,
        user: req.user._id
            });
            console.log(post);
             await post.populate({path:'user',select:'name email'});
             let userDet =await Post.findOne({user:req.user._id}).populate('user').exec();

               
            //  console.log("fafafadf",userDet.user.name);
            // console.log("*****");
             if(req.xhr){
                
               return res.status(200).json({
                  data:{
                     post: post,
                  userDet: userDet.user.name
                  },
                  message: "Post Created!"
               });
             }

             req.flash('success','Post published!');
             return res.redirect('back');
        }catch(err){
           req.flash('error',err);
           return res.redirect('back');
        }
}

module.exports.destroy = async function(req,res){
   try{
      let post = await Post.findById(req.params.id);
         if(post.user == req.user.id){

            //deleting all the associated likes of comments of the post as well as the likes of post itself

            await Like.deleteMany({likeable: post,onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();
               await Comment.deleteMany({post: req.params.id});

               if(req.xhr){
                  return res.status(200).json({
                     data:{
                        post_id: req.params.id
                     },
                     message: "Post deleted"
                  }); 
               }
               
               req.flash('success','Post and associated comments deleted!');
               return res.redirect('back');
         }else{
               req.flash('error','You cannot delete this post!');
               return res.redirect('back');
         }
   }catch(err){
     req.flash('error',err)
     return res.redirect('back');
   }
}