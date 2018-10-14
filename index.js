var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 加入線上人數計數
let onlineCount = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log("user join");  
  // 有連線發生時增加人數
    onlineCount++;
    // 發送人數給網頁
    io.emit("online", onlineCount);

    socket.on("greet", function(){
        socket.emit("greet", onlineCount);
    });

    socket.on("send", function(msg){
        // 如果 msg 內容鍵值小於 2 等於是訊息傳送不完全
        // 因此我們直接 return ，終止函式執行。
        if (Object.keys(msg).length < 2) return;

        // 廣播訊息到聊天室
        io.emit("msg", msg);
    });
    
    socket.join('' , function() {  //.join 加入到指定的room (以user id為room name)
      var rooms = Object.keys(socket.rooms);
        socket.on('chat message', function(msg){
          socket.emit('show message', msg);  //要用socket就會將訊息傳到個別的room，若用io就會將訊息傳給所有在連線上的人
          console.log("room is: "+rooms);
          console.log('message: ' + msg);
        });
    });

    socket.on('disconnect', function(){
        // 有人離線了，扣人
        onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
        io.emit("online", onlineCount);
        console.log("user left");
    });
});







// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/index', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// app.get('/addtoRoom', function(req, res){
//   res.sendFile(__dirname + '/addtoRoom.html');
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

// function chatRoom(socket){
//   console.log('a user connected: '+ socket.id); 

//     socket.join(socket.id , function() {  //.join 加入到指定的room (以user id為room name)
//       var rooms = Object.keys(socket.rooms);
//       socket.on('chat message', function(msg){
//         socket.emit('show message', msg);  //要用socket就會將訊息傳到個別的room，若用io就會將訊息傳給所有在連線上的人
//         console.log("room is: "+rooms);
//         console.log('message: ' + msg);
//             });
//       });
     
//       //user left 
//       socket.on('disconnect',function(){
//         console.log("The User : "+socket.id+" left.");
//         io.emit('user left');
//       });

//       //b頁面 add to chatroom
//       socket.on('add to chatroom',function(roomAll){
//         console.log(roomAll);
//         socket.join(roomAll.roomId_key , function() { 
//           var joinrooms = Object.keys(socket.rooms);
//           //
//           newroom=roomAll.roomId_key;
//           socket.emit('user join',newroom)

//           socket.on('chat message', function(msg){
//             socket.emit('show message', msg);
//           })
//         console.log('join into room:'+roomAll.roomId_key);
//       })
//     })
    
      
//       //
//       socket.on('chat message_b', function(msg){
//         // socket.join(roomAll.roomId_key, function() {
//         io.emit('show message_b', msg);  //要用socket就會將訊息傳到個別的room，若用io就會將訊息傳給所有在連線上的人
//         })
//         // console.log("room is: "+rooms);
//         // console.log('message: ' + msg);
  
// }   

// io.on('connection', chatRoom);          //當新使用者連接進來的時候  io.on
