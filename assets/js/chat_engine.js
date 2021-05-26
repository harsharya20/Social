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
       //send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val(); //take out value of input

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('recieve_message', function(data){
            console.log('message recieved', data.message);
        //checking whether my message is coming back to me from the server i.e everyone has also recieved or some other user send the message
            let newMessage= $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));
                              //sub-script
            newMessage.append($('<sub>',{
               'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}