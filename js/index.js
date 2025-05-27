import { pacientesDoDia } from "../js/patients.js";

function loadCompo(path, targetSelector){
  fetch(path)
  .then(response => {
    if(!response.ok) throw new Error("Erro no carregamento");
    return response.text();
  })
  .then(data => {
    document.querySelector(targetSelector).innerHTML = data;
  })
  .catch(error => {
    console.error(error);
    console.log("Erro encontrado: " , error);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarPacientes(pacientesDoDia);
  loadCompo('../components/aside.html','.sidebar');
  
  document.querySelector(".patients-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("icon-remover")) {
      const id = event.target.dataset.id;
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
        div.classList.add("detailPoints");
      });
    }
  });
});

function renderizarPacientes(pacientes) {
  const lista = document.querySelector(".patients-list");
  if (!lista) return;
  lista.innerHTML = "";

  Object.entries(pacientes).forEach(([id, paciente]) => {
    const div = document.createElement("div");
    div.className = "patient";

    div.innerHTML = `
      <div class="avatar-circle"></div>
      <div class="info">
        <strong>${paciente.nome}</strong>
        <span></span>
        <p>${paciente.horario}</p>
      </div>
      <button class="btn">VISUALIZAR PRONTUÁRIO </button>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        fill="currentColor" class="bi bi-three-dots-vertical icon-remover"
        data-id="${id}" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0
          1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
      </svg>
    `;
    lista.appendChild(div);
  });
}

document.querySelector(".newAppointement").addEventListener("click", () => {
  window.location.href = "../pages/calendar.html";
});
