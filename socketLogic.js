var server = require('./server');
var io = require('socketio')(server);

io.on('connection', (socket) => {
  socket.emit('hellooooooo');
  console.log('connection made!!');
});