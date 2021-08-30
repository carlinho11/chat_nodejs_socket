const atendenteData = require("../Data/atendenteData");
const conversaData = require("../Data/conversaData");
const mensagemData = require("../Data/mensagemData");


function conectarAtendente(atendente, socket){
    atendenteData.updateAtendente(atendente);
    socket.emit("atendenteConectou", "OK");
}

function conectarCliente(conversa, socket) {
    
    console.log("Cliente Iniciou o Chat: " + conversa.nomeConversa);
    conversa.data= dataAtualFormatada();

    conversa.status='0';

    atendenteData.proximoAtendente(function(idAtendente, tokenAtendente){ 
        conversa.idAtendente = idAtendente;
        conversaData.insertConversa(conversa, function(res){ 
            socket.context={'idConversa':res.idConversa};  
            socket.emit("clienteConectou", res);
            socket.to(tokenAtendente).emit("novaConversa"); 
        }); 
    });    
}

function dataAtualFormatada(){
    let data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
  }

function entrarSala(data){
    console.log("Entrou na sala: " + data);
}

function enviarMensagem(mensagem, socket){

    var data = new Date();

    mensagem.hora=data.getHours()+':'+data.getMinutes()+':'+data.getSeconds(); 

    mensagemData.insertMensagem(mensagem, function(id){
        mensagemData.filterMensagens(id, function(res){  
            console.log(res)      
            if(res.enviou=='0'){
                socket.to(res.tokenConversa).emit("receberMensagem", res);
            }else{
                socket.to(res.tokenAtendente).emit("receberMensagem", res);      
            }  
        });        
    });    
}

function aceitarConversa(data, socket) {
    conversaData.aceitarConversa(data,function(){
        const res = {
            nomeAtendente:data.nomeAtendente,
            idAtendente:data.idAtendente,
        }
        socket.to(data.tokenConversa).emit("atendimentoIniciou", res);
      });  
  };

function desconectar(socket){
    if (socket.context.idConversa > 0) {
        conversaData.fecharConversa(socket.context.idConversa); 
    }
    console.log("Desconectou")
}

module.exports = {conectarAtendente, enviarMensagem, entrarSala, desconectar, conectarCliente, aceitarConversa}

/*
C – Create (POST)
R – Read (GET)
U – Update (PUT)
D – Delete (DELETE)
*/