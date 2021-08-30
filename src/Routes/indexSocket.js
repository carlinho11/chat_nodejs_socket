const controller = require('../Controllers/socketController');

module.exports = (io) => {
   io.on("connection", socket => { 

      socket.context={'idConversa':0};

      socket.on("conectarAtendente", (atendente)=>{
         controller.conectarAtendente(atendente, socket);
      });

      socket.on("conectarCliente", (cliente)=>{
         controller.conectarCliente(cliente, socket);
      });

      socket.on("entrarSala", (data)=>{
         controller.entrarSala(data);
      });
    
      socket.on("enviarMensagem", (data)=>{
         controller.enviarMensagem(data, socket);
      });

      socket.on("aceitarConversa", (data)=>{
         controller.aceitarConversa(data, socket);
      });
    
      socket.on("disconnect", ()=>{ 
         controller.desconectar(socket);
      });
   });
}