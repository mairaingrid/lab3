var valid = {
  checkParams:function(refobj, evalueobj){
    if(Object.keys(refobj).sort().toString() == Object.keys(evalueobj).sort().toString()){
      return true;
    }
      return false;
  },
  checkPassword:function(password){
    //verifica que una contraseña contiene letras tanto en mayusculas y minusculas
    //como caracteres numericos. También verifica que el tamaño de la contraseña sea de 6 a 15 caracteres.
    var exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/g
    if(password.match(exp) == null){
      return false;
    }
      return true;
  },
  checkEmail:function(email){
    var exp = /^\w{1,}@\w{1,}[.]\w{2,3}$/g
    if(email.match(exp) == null){
      return  false;
    }
      return true;
  }
};
module.exports = valid;
