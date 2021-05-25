const Like =require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try{
        //likes/toggle/id=abcde type=POST
      let likeable;
      let deleted = false;

      if(req.query.type == 'Post'){
          likeable = await (await Post.findById(req.query.id)).populated('likes');
      }else{
        likeable = await (await Comment.findById(req.query.id)).populated('likes');
      }
     //check if a like already exist
     let existingLike = await Like.findOne({
         likeable: re.query.id,
         onModel: req.query.type,
         user: req.user._id
     });

       //if a like already exist then delete it
       if(existingLike){
           likeable.likes.pull(existingLike._id);
           likeable.save();

           existingLike.remove();
           deleted= true;
       }else{
           //else make a new like
           let newLike = await Like.create({
               user: req.query._id,
               likeable: req.query.id,
               onModel: req.query.type
           });

           likeable.likes.push(like._id);
           likeable.save();

       }

       return res.json(200, {
           message: "Request Successful!",
           data:
           {
               deleted: deleted
           }
       })
    }
    catch(err){
        console.log(err);
        return res.json(500, {
            message : 'Internl Server Error'
         } );
    }
}