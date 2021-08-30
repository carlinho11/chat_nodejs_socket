const MensagemController = require('../Controllers/MensagemController');

module.exports = (app) => {
   app.get('/Mensagens', MensagemController.mensagens);
}