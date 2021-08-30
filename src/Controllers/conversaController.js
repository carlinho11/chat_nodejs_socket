exports.conversas = (req, res, next) => {
    (async () => {
      const db = require("../data/ConversaData");
      db.selectConversas(req.query.idAtendente,function(rows){
        res.status(200).json(rows);
      });    
  })();
};

