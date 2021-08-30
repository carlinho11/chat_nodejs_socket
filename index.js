var cors = require('cors')
var express = require('express');
var app = express();

app.use(cors())

const server = require('http').createServer(app);

const io = require('socket.io')(server);


server.listen(3001, () =>{
  console.log('Conectado');
});

require('./src/Routes/indexSocket')(io);

require('./src/Routes/index')(app);