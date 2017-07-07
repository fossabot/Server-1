/* eslint-disable */
const io = require('socket.io');
const PrivateSocket = require('private-socket');

const server = io(8080);

server.on('connection', (socket) => {
  console.log('CLIENT CONNECTED');

  const ps = new PrivateSocket(socket);

  ps.data((data) => {
    console.log('data');
    console.log(new Date().toString(), 'data:', JSON.parse(data));
  });

  ps.on('disconnect', () => {
    server.emit('CLIENT DISCONNECTED');
  });
});
