 
module.exports = class UsuarioDao{  
     constructor(conexao){

         this.conexao = conexao;
        
       }


GetAutenticUsuario(nome, senha){
  
    return new Promise((resolve, reject) => {
        this.conexao.query("SELECT * FROM usuario WHERE documentoUsuario = ? AND senhaUsuario = ?",
        [nome, senha],
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
    

  }
    SetUsuario(usuarioCliente){
        
        return new Promise((resolve, reject) => {
            this.conexao.query("INSERT INTO Cliente(nome, cpf, ) VALUES ?,?,?,?,?,?",
            [usuarioCliente.nome, usuarioCliente.cpf, usuarioCliente.email],
            function (error, elements) {
                if (error) {
                    return reject(error);
                }
                console.log(elements)
                return resolve(elements);
            });
        });

    }

    SetUsuarioEmpresa(usuarioEmpresa){
 
        return new Promise((resolve, reject) => {
            this.conexao.query("INSERT INTO dreamcar.usuario (nomeUsuario, documentoUsuario, telefoneUsuario, emailUsuario, senhaUsuario, logradouroUsuario, numeroUsuario, cepUsuario, bairroUsuario, cidadeUsuario, ufUsuario, codigoUsuario) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
            [usuarioEmpresa.nomeCompleto, usuarioEmpresa.cnpj, usuarioEmpresa.telefone, usuarioEmpresa.email, usuarioEmpresa.senha, usuarioEmpresa.rua, usuarioEmpresa.number, usuarioEmpresa.cep, 'Ariston', 'Carapicuiba','sp', 1],
        function (error, result) {
                if (error) {
                    return reject(error);
                }else{
                    resolve(result.insertId);
                }
            
        })
    })
};               

    
SetServicos(id_servico, id_empresa){
    return new Promise((resolve, reject) => {
    this.conexao.query("INSERT INTO EmpresaServicos(idServico, idUsuarioEmpresa) value (?, ?)", [id_servico, id_empresa],
                           function (error, elements){
                               if(error){
                                   return reject(error);
                               }else{
                                  return resolve(elements)
                               }
                            
                           });
          return resolve;
    });
}

    getIdByNameServico(nomeServico){
           return new Promise((resolve, reject) => {
             this.conexao.query("SELECT idServicos FROM dreamcar.servicos where nomeServico =  ?", [nomeServico],
                             function (error, elements) {
                                 if (error) {
                                     return reject(error);
                                 }
                                 return resolve(elements);
                             });
     
    })
}   
GetRecuperarSenha(cpf){
    return new Promise((resolve, reject) => {
         this.conexao.query("SELECT nomeUsuaario, emailUsuario FROM dreamcar.usuario where documentoUsuario =  ?", [cpf],
                         function (error, elements) {
                             if(erro){
                                return reject(error)
                             }else{
                                return resolve(elements);
                             }
                         });
  
                    });
    
}
}