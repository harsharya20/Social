const Comment =require('../models/comment');
const Post = require('../models/post');

module.exports.create= async function(req,res){

    try{
        let post =await Post.findById(req.body.post);

        if(post){
           let comment = await Comment.create({
                content : req.body.content,
                post:req.body.post,
                user: req.user._id
           });

                post.comments.push(comment);
                post.save();

                if(req.xhr){
                    // fetch the user id for comment
                    comment = await comment.populate('user', 'name').execPopulate();
                    
                    return res.status(200).json({
                        data: {
                            comment : comment
                        },
                        message : "Post Created!"
                    });
                }
                req.flash('success', 'Comment added!');
                return res.redirect('/');
            }
        }
    catch(err){
        req.flash('error', err);
        return ;
    }
}

module.exports.destroy=async function(req,res){
 try{
    let comment= await  Comment.findById(req.params.id);
    if(comment.user == req.user.id){
         let postId= comment.post;

         comment.remove();
        
        let post= Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});//removing id of the comment from the list of comments
        //send the comment id which was deleted back to the views
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id : req.params.id
                },
                message : "Post deleted!"
            });
        } 

        
        req.flash('success', 'Comment removed!');
        return res.redirect('back');

}else{
    req.flash('error', 'Unauthorized');
    return res.redirect('back');
}
 }
 catch(err){
    req.flash('error', err);
    return ;
 }
  
}

