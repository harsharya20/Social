//observer which is going to recieve the incominh conenction from all the users

module.exports.chatSockets = function(socketServer){
let io = require('socket.io')(socketServer,{cors : {
    origin: "http://localhost:5000",
     "secure": false,
    "changeOrigin": true
  }});

io.sockets.on('connection', function(socket){
    console.log('new connection recieved', socket.id);

    socket.on('disconnect', function(){
        console.log('socket disconnected!');
    });

    socket.on('join_room', function(data){   //event send by the client
        console.log('joining request recieve', data); //user send req. to join a room

        socket.join(data.chatroom);  //make the user join that chatroom

        io.in(data.chatroom).emit('user_joined' , data);             //emitting in specific chatroom that new user with data details has joined the chat room

    });

    //detect send_message and broadcast to everyone in the room
    socket.on('send_message', function(data){
        console.log(data,"inside send message");
        io.in(data.chatroom).emit('recieve_message', data);
    });

});
}
