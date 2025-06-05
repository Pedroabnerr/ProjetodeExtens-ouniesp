import { loadCompo } from "./global.js";

document.addEventListener("DOMContentLoaded", () => {
  loadCompo('../components/aside.html', '.sidebar');

  const dadosPaciente = sessionStorage.getItem("pacienteSelecionado");
  if (!dadosPaciente) return;

  const paciente = JSON.parse(dadosPaciente);

  // Preencher inputs e selects com base nos nomes
  document.querySelectorAll('input, select').forEach(input => {
  const campo = input.name;
  if (!campo) return;

  if (input.type === 'radio') {
    if (paciente[campo] === input.value) {
      input.checked = true;
    }
  } else if (input.tagName.toLowerCase() === 'select') {
    input.value = paciente[campo] || '';
  } else {
    if (paciente[campo] !== undefined) {
      input.value = paciente[campo];
    }
  }
  });
  });

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