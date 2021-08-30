exports.atendentes = (req, res, next) => {
    (async () => {
      const db = require("../data/AtendenteData");
      db.selectAtendentes(function(rows){
        res.status(200).json(rows);
      });    
  })();
};