exports.mensagens = (req, res, next) => {
    (async () => {
      const db = require("../data/MensagemData");
      db.selectMensagens(req.query.idConversa,function(rows){
        res.status(200).json(rows);
      });    
  })();
};