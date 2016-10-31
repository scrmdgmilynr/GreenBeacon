var server = require('./server');
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('addTicket', () => {
    io.emit('ticketChange');
  });

  socket.on('claimTicket', () => {
    io.emit('ticketChange');
  });

  socket.on('solveTicket', () => {
    io.emit('ticketChange');
  });

  socket.on('unsolvedTicket', () => {
    io.emit('ticketChange');
  });

  socket.on('messageAdd', (data) => {
    io.emit('messageAdded', data);
  });

  socket.on('typing', (data) => {
    io.emit('otherTyping', data);
  });

  socket.on('codeChange', (code, id) => {
    io.emit('codeReceived', code, id);
  });

  socket.on('ticketClamied', () =>{
    io.emit('clamiedTicket');
  })

});
