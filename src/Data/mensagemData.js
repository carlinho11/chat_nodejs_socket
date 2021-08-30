async function selectMensagens(idConversa, callback){

  const db = require("./db");
  const conn = await db.connect();

  return await conn.query('SELECT mensagens.enviou, mensagens.hora, mensagens.idAtendente, mensagens.idConversa, mensagens.mensagem, conversas.nomeConversa FROM conversas INNER JOIN (atendentes INNER JOIN mensagens ON atendentes.idAtendente = mensagens.idAtendente) ON conversas.idConversa = mensagens.idConversa WHERE mensagens.idConversa=?',[idConversa], function (err,  rows, fields) {
    if (err) throw err;
    return callback(rows);
  });
}

async function filterMensagens(id, callback){

  const db = require("./db");
  const conn = await db.connect();

  return await conn.query('SELECT mensagens.*, atendentes.*, conversas.* FROM conversas INNER JOIN (atendentes INNER JOIN mensagens ON atendentes.idAtendente = mensagens.idAtendente) ON conversas.idConversa = mensagens.idConversa WHERE (mensagens.idMensagem=?);',
  [id], function (err,  rows, fields) {
    if (err) throw err;
    return callback(rows.length>0?rows[0]:null);
  });
}

async function insertMensagem(mensagem, callback){
  
  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Insert into mensagens(idConversa, idAtendente, enviou, hora, mensagem) Values (?,?,?,?,?)';
  const values = [mensagem.idConversa, mensagem.idAtendente, mensagem.enviou, mensagem.hora, mensagem.mensagem];
  await conn.query(sql,values, function (err, results) {
    if (err) throw err;
    return callback(results.insertId);
  });
  
}

async function updateMensagem(mensagem){
  
  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Update mensagens set idConversa=?, idAtendente=?, enviou=?, hora=?, mensagem=? Where idMensagem=?';
  const values = [mensagem.idConversa, mensagem.idAtendente, mensagem.enviou, mensagem.hora, mensagem.mensagem, mensagem.id];

  await conn.query(sql,values);
}

async function deleteMensagem(id){
  
  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Delete from mensagens Where idMensagemd=?';
  
  await conn.query(sql,[id]);
}


module.exports = {selectMensagens, insertMensagem, updateMensagem, deleteMensagem, filterMensagens}

