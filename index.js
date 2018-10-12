var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/index', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/addtoRoom', function(req, res){
  res.sendFile(__dirname + '/addtoRoom.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function chatRoom(socket){
  console.log('a user connected: '+ socket.id);   
    socket.join(socket.id , function() {  //.join 加入到指定的room (以user id為room name)
      var rooms = Object.keys(socket.rooms);
      socket.on('chat message', function(msg){
        socket.emit('show message', msg);  //要用socket就會將訊息傳到個別的room，若用io就會將訊息傳給所有在連線上的人
        console.log("room is: "+rooms);
        console.log('message: ' + msg);
            });
      });
      //user left 
      socket.on('disconnect',function(){
        console.log("The User : "+socket.id+" left.");
        io.emit('user left');
      });

      //b頁面 add to chatroom
      socket.on('add to chatroom',function(roomAll){
        console.log(roomAll);
        socket.join(roomAll.roomId_key , function() { 
          var rooms = Object.keys(socket.rooms);
          //
          // socket.on('chat message_b', function(msg){
          //   socket.emit('show message_b', msg);
          //
        // let room = JSON.parse(roomAll);  //字串轉物件
        // var obj_str = JSON.stringify(obj)  //物件轉字串
        console.log('join into room:'+roomAll.roomId_key);
      })
    })
    
      
      //
      socket.on('chat message_b', function(msg){
        // socket.join(roomAll.roomId_key, function() {
        io.emit('show message_b', msg);  //要用socket就會將訊息傳到個別的room，若用io就會將訊息傳給所有在連線上的人
        })
        // console.log("room is: "+rooms);
        // console.log('message: ' + msg);
  
}   

io.on('connection', chatRoom);          //當新使用者連接進來的時候  io.on
