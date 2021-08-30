const AtendenteController = require('../Controllers/AtendenteController');

module.exports = (app) => {
   app.get('/Atendentes', AtendenteController.atendentes);
}