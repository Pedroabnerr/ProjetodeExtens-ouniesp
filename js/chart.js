import { loadCompo } from "./global.js"

document.addEventListener("DOMContentLoaded", () => {
    loadCompo('../components/aside.html', '.sidebar', ()=> {
    console.log(document.querySelector(".sidebar").innerHTML);
  })
});

// Endereça para os pacientes do dia 
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.PacientesDiaConteiner')) {
    window.location.href = "../index.html";
  }
});

// Endereça para cadastro
document.querySelector(".btn").addEventListener('click', ()=> {
    window.location.href = "../pages/rapSheet.html";
});