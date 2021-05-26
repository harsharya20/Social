//observer which is going to recieve the incominh conenction from all the users

module.exports.chatSockets = function(socketServer){
let io = require('socket.io')(socketServer);

io.sockets.on('connection', function(socket){
    console.log('new connection recieved', socket.id);

    socket.on('disconnect', function(){
        console.log('socket disconnected!');
    });
});
}