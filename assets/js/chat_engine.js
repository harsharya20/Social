//communicating from client side i.e user on browser (frontend)
//firing the element: .emit
//emit is done on a particular room so that others user dontknow
//recieving that fired elemnet : .on
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${this.chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000' ,{transports: ['websocket', 'polling' ,'flashsocket']});

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connetion established using sockets...!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'

            });
                     //detect when user has joined
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
                    
            });       
        });
    }
}