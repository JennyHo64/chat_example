var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){     //當新使用者連接進來的時候  io.on
  console.log('a user connected: '+socket.id);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  let chatroom =  socket.id;//{}'room: '+
    socket.join(chatroom , () => {  //.join 加入到指定的room
      var rooms = Object.keys(socket.rooms);
      socket.on('chat message', function(msg){
        socket.emit('chat message', msg);  //要用socket就會將訊息傳到個別的room，若用io就會將訊息傳給所有在連線上的人
        console.log(rooms); // [ <socket.id>, 'room 237' ]
        console.log('message: ' + msg);
        // io.emit('a new user has joined the room'); // broadcast to everyone in the room
        // io.sockets.to(rooms).emit('a new user has joined the room'); // broadcast to everyone in the room
      });
      });

      //user left 
      socket.on('disconnect',function(){
      console.log("The User : "+socket.id+" left.");
      io.emit('user left');
      // io.emit('user left',{
      //   username:socket.username
      // });
    });
      
    });


  
  
// /*-----------------------------------
// //html範例

// var app = require('express')();
// var http = require('http').Server(app);

// // app.get('/', function(req, res){
// //   res.send('<h1>Hello world</h1>');
// // });

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
//   });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
// --------------------------------------*/
