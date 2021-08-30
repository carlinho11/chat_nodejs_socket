const ConversaController = require('../Controllers/ConversaController');

module.exports = (app) => {
   app.get('/Conversas', ConversaController.conversas);
}