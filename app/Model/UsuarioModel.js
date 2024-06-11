//Esta forma de criar uma classe para realizar verificações sem precisar ir ao banco de dados, validar idade, validar email como exemplor
const val = require('validator');

function VerificaIdade(dataNasc) {
      const dataDia = new Date();
      const dn = new Date(dataNasc);
      console.log(dn);
      console.log(dataDia);
      const idade = dataDia.getTime() - dn.getTime();
      console.log("minissegundos = " + idade);
      const idadeEmDias = Math.floor(idade / (1000 * 60 * 60 * 24))
      const idadeEmAnos = Math.floor(idadeEmDias / 365);
      console.log(idadeEmDias);
      console.log(idadeEmAnos);
      if(idadeEmAnos >= 18){
        return true;
      }else{
        return false;
      } 
}
function VerificaEmail(email){
    if(val.isEmail(email)){
      return true;
    }else{
      return false;
    }


}



module.exports = {
  VerificaIdade,
  VerificaEmail  
}