import { loadCompo } from "./global.js";

document.addEventListener("DOMContentLoaded", ()=> {
    loadCompo('../components/aside.html', '.sidebar');
})

// Endereça para o Calendário
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.CalendarContainer')) {
    window.location.href = "../pages/calendar.html";
  }
});

// Endereça para os pacientes do dia 
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.PacientesDiaConteiner')) {
    window.location.href = "../index.html";
  }
});