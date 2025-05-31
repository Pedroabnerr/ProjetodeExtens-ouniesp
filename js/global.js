import { pacientesDoDia } from "./patients.js";

export function loadCompo(path, targetSelector, callback) {
  fetch(path)
    .then(response => {
      if (!response.ok) throw new Error("Erro no carregamento");
      return response.text();
    })
    .then(data => {
      document.querySelector(targetSelector).innerHTML = data;
      if (callback && typeof callback === 'function') {
        callback(); // executa callback depois de inserir o conteúdo
      }
    })
    .catch(error => {
      console.error(error);
      console.log("Erro encontrado: ", error);
    });
}

export function renderizarPacientes(pacientes) {
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
      <div class="but_Thirdpoints">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="currentColor" class="bi bi-three-dots-vertical icon-remover"
          data-id="${id}" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0
            1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg>
      </div>
    `;
    lista.appendChild(div);
  });
}
