async function selectAtendentes(callback){

  const db = require("./db");
  const conn = await db.connect();

  return await conn.query('Select nomeAtendente as label, idAtendente from atendentes;', function (err, rows, fields) {
    if (err) throw err;
    callback(rows)
  });
}
async function insertAtendente(atendente){
  
  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Insert into atendentes(nomeAtendente, tokenAtendente) Values (?,?)';
  const values = [atendente.nome, atendente.token];
 
  await conn.query(sql,values);
}

async function updateAtendente(atendente){
  
  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Update atendentes set nomeAtendente=?, tokenAtendente=? Where idAtendente=?';
  const values = [atendente.nomeAtendente, atendente.tokenAtendente, atendente.idAtendente];

  await conn.query(sql,values);
}

async function deleteAtendente(id){
  
  const db = require("./db");
  const conn = await db.connect();

  const sql = 'Delete from atendentes Where idAtendente=?';
  
  await conn.query(sql,[id]);
}

async function proximoAtendente(callback) {

  const db = require("./db");
  const conn = await db.connect();

  return conn.query('SELECT atendentes.idAtendente, atendentes.tokenAtendente, SUM(conversas.peso) as quantidade FROM atendentes LEFT JOIN conversas ON conversas.idAtendente = atendentes.idAtendente group BY atendentes.idAtendente ORDER BY `quantidade`  ASC limit 1;', function (err, rows, fields) {
    if (err) throw err;
    const [atendente] = rows;
    console.log(atendente)
    callback(atendente.idAtendente, atendente.tokenAtendente)
  });
}


module.exports = {selectAtendentes, insertAtendente, updateAtendente, deleteAtendente, proximoAtendente}

