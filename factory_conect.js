const mysql = require('mysql2');

// Conexão com o banco de dados (reutilizando a conexão existente)
module.exports = function(){
return mysql.createConnection({
  host: 'dreamcar.mysql.uhserver.com',
  user: 'dreamcar',
  password: '1qaSW@',
  database: 'dreamcar',
  port: 3306
})
};