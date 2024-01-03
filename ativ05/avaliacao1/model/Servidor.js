module.exports = class Servidor { 
  constructor() {
    this.matricula = "";
    this.nome = "";
    this.cargo = "";
  }

  inserir(conexao) {
    var sql = "insert into servidor (matricula, nome, cargo) values (?, ?, ?)";
    conexao.query(sql, 
                  [this.matricula, this.nome, this.cargo],
                  function (err, result) {
                    if (err) throw err;
                  }
    );

  }

  atualizar(conexao) {
    
  }

  excluir(conexao) {
    
  }

 listar(conexao, callback) {
  var sql = "select * from servidor";
  
   conexao.query(sql, 
       function (err, result) {
        if (err) throw err;
         return  callback(result);
        }
    );
  }

}
