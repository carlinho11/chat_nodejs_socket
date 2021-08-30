async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const mysql = require('mysql2');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'testechat'
  });
  global.connection = connection;
  return connection;
}

module.exports = {connect}

