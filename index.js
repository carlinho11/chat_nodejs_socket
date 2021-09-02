require('dotenv').config()
var cors = require('cors')
var express = require('express');
var app = express();


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const server = require('http').createServer(app);

const io = require('socket.io')(server);

console.log(process.env.PORT)

server.listen(process.env.PORT || 3000, () =>{
  console.log('Conectado');
});

require('./src/Routes/indexSocket')(io);

require('./src/Routes/index')(app);