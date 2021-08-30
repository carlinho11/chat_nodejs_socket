const ConversaRoute = require('./conversaRoute');
const MensagemRoute = require('./MensagemRoute');
const AtendenteRoute = require('./AtendenteRoute');

module.exports = (app) => {
   ConversaRoute(app)
   MensagemRoute(app)
   AtendenteRoute(app)
}