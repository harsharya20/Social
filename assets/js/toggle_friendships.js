class ToggleFriendship{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }


    toggleFriendship(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data) {

                // console.log(data,'******');
                
                if (data.data.friendAdded == true){
                    $(' button', self).html(`REMOVE FRIEND`);
                    new Noty({
                         theme: 'relax',
                         text: `Added to your friend list`,
                         type: 'success',
                         layout: 'topRight',
                         timeout: 1500
                         
                     }).show();
                }else{
                    $(' button', self).html(`ADD FRIEND`);
                    new Noty({
                         theme: 'relax',
                         text: `Removed from your friend list`,
                         type: 'error',
                         layout: 'topRight',
                         timeout: 1500
                         
                     }).show(); 
                }

            })
            .fail(function(errData) {
                console.log('error in completing the request', errData);
            });
            

        });
    }
}