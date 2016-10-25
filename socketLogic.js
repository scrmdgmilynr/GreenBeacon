var server = require('./server');
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  socket.emit('hellooooooo');
  console.log('connection made!!');
});