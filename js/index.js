import { pacientesDoDia } from "./patients.js";
import { loadCompo, renderizarPacientes } from "./global.js";


// Renderiza os elementos do Index 
document.addEventListener("DOMContentLoaded", () => {
  renderizarPacientes(pacientesDoDia);
  loadCompo('components/aside.html', '.sidebar', () => {
  console.log(document.querySelector('.sidebar').innerHTML);
  });

// Deleta os pacientes do dia
  document.querySelector(".patients-list").addEventListener("click", (event) => {
    if (event.target.closest(".icon-remover")) {
      const elemento_html = document.querySelector(".icon-remover");
      const id = elemento_html.getAttribute('data-id');
      const icon = event.target;

      document.querySelectorAll(".detailPoints").forEach(e => e.remove());

      const div = document.createElement("div");
      div.classList.add("detailPoints");
      div.textContent = "Cancelar Agendamento";

      const rect = icon.getBoundingClientRect();  
      div.style.position = "absolute";
      div.style.top = `${rect.top + window.scrollY}px`;
      div.style.left = `${rect.left + window.scrollX + 66}px`;

      document.body.appendChild(div);

      div.addEventListener("click", () => {
        delete pacientesDoDia[id];
        renderizarPacientes(pacientesDoDia);
        div.style.display = "none";
      });  
    }
  });
});

// Novo Agendamento -> calendar.html
document.querySelector(".newAppointement").addEventListener("click", () => {
  window.location.href = "pages/calendar.html";
});

// Endereça para o Calendário
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.CalendarContainer')) {
    window.location.href = "pages/calendar.html";
  }
});

//Endereça para a página de cadastro
document.querySelector("btn").addEventListener('click', () => {
  window.location.href = "pages/rapSheet.html";
})

