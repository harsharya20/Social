{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
             
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                   //console.log(data,"******");
                    let newPost = newPostDom(data.data.post,data.data.userDet);
                   // console.log(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);
 
                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
  

    // method to create a post in DOM
    let newPostDom = function(post,name){
       // console.log("haths",post);
        // CHANGE :: show the count of zero likes on this post
        return $(`
        <li  id="post-${post._id }" class="new-post">
<div> 
   <small id="post-user">
   ${ name }
   </small>
   <small id="post-content">
   ${ post.content }
   </small>

   <small id="like-del">

   <small>
       
           <a class="toggle-like-button" data-likes="${ post.likes.length }" href="/likes/toggle/?id=${post._id}&type=Post">
              <span class="toggle-like-button" style="color:white;"> ${ post.likes.length }  </span>
             <span class="toggle-like-button">???</span>
           </a>
       
            
       
   </small>
    
   <small>
       <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
   </small>
  

   </small>

   <br>
</div>

<div class="post-comments">
  
       <form action="/comments/create" id="post-${ post._id }-comments-form" class="new-comments-form" method="POST">
           <input id="create-comment" type="text" name="content" placeholder="Type Here to add comment..." required>
           <input type="hidden" name="post" value="${ post._id }" >
           <input id="cmnt-btn" type="submit" value="Add Comment">
       </form>

  

   <div class="post-comments-list">
       <ul id="post-comments-${ post._id }" class="content-style">
          
       </ul>
   </div>
</div>

</li>
        `)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}