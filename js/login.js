import { ops } from "../js/op.js"

document.querySelector('.send').addEventListener('click', (e) => {
    e.preventDefault();

    const op = document.querySelector('.inpCod').value.trim();
    const pass = document.querySelector('.passw').value.trim();

    Object.keys(ops).forEach((item) => {
    if (op == ops[item].nome && pass == ops[item].cod){
        window.location.href = "../index.html";
    }
    });
});