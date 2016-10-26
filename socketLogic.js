var server = require('./server');
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log('poop');
});