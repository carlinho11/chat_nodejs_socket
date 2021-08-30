async function selectConversas(idAtendente,callback) {

  const db = require("./db");
  const conn = await db.connect();

  return conn.query('SELECT * FROM conversas where (status = "0" and idAtendente=?) or (status = "1" and idAtendente=?)  ORDER BY idConversa DESC;',[idAtendente,idAtendente], function (err, rows, fields) {
    if (err) throw err;
    callback(rows)
  });
}

async function insertConversa(conversa, callback) {

  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Insert into conversas(nomeConversa, data, tokenConversa, status, idAtendente) Values (?,?,?,?,?)';
  const values = [conversa.nomeConversa, conversa.data, conversa.tokenConversa, conversa.status, conversa.idAtendente];

  await conn.query(sql, values, function (err, results) {
    if (err) throw err;
    conversa.idConversa=results.insertId;
    return callback(conversa);
  });
}

async function aceitarConversa(data, callback) {

  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Update conversas set status=1, idAtendente=? Where idConversa=?';
  const values = [data.idAtendente, data.idConversa];

  await conn.query(sql, values, function (err,  rows, fields) {
    if (err) throw err;
    return callback();
  });
}

async function updateConversa(cliente) {

  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Update conversas set nomeConversa=?, data=?, tokenConversa=?, status=? Where idConversa=?';
  const values = [cliente.nome, cliente.data, cliente.token, cliente.satus, cliente.id];

  await conn.query(sql, values);
}


async function fecharConversa(status, id) {

  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Update conversas set status=2, peso=0 Where idConversa=?';
  const values = [status, id];

  await conn.query(sql, values, function(err, results){
    console.log(results);
  });
}

async function deleteConversa(id) {

  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Delete from conversas Where idConversa=?';

  await conn.query(sql, [id]);
}


module.exports = {
  selectConversas,
  insertConversa,
  updateConversa,
  deleteConversa,
  fecharConversa,
  aceitarConversa,
}