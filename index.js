const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('ユーザーが接続しました');
  
  // メッセージを受信して全員に転送
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('ユーザーが切断しました');
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});