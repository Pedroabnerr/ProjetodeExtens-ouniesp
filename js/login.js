import { ops } from "./op.js";

document.querySelector('.send').addEventListener('click', (e) => {
    e.preventDefault();
        const op = document.querySelector('.inpCod').value.trim();
        const passw = document.querySelector('.passw').value.trim();
        let user = new App(op, passw)
        user.login()
    });

class App {
  constructor(op, password){
    this.op = op;
    this.password = password;
  }

  login(){
    Object.keys(ops).forEach((item) => {
    if (this.op == ops[item].nome && this.password == ops[item].cod){
        window.location.href = "../index.html";
      } 
    });    
  }
}