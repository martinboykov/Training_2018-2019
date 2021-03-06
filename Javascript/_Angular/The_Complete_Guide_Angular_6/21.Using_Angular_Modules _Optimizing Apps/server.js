/* eslint-disable no-process-env*/
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const debug = require('debug')('debug');
const compression = require('compression');
app.use(compression());
app.use('/', express.static(path.join(__dirname, '/dist/my-first-app')));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/my-first-app', 'index.html'));
});
const normalizePort = (val) => { // checks if env ports are valid numbers
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const onError = (error) => {
  const addr = server.address();
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  debug('Listening on ' + bind);
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port); // port is reserved word in express

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
