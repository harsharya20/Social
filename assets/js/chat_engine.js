//communicating from client side i.e user on browser (frontend)

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
        this.socket.on('connect', function(){
            console.log('connetion established using sockets...!');
        });
    }
}