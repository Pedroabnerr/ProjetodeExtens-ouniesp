import { pacientesDoDia } from "../js/patients.js";

document.querySelector(".send").addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector(".inputPatient").value.trim();
    const show = document.querySelector(".showPatient");

    Object.keys(pacientesDoDia).forEach((item) => {
      if (name == pacientesDoDia[item].nome){
        const div = document.createElement('div');
        div.innerHTML = `  
        <div class="avatar-circle"></div>
        <div class="info">
          <strong>${pacientesDoDia[item].nome}</strong>
          <span></span>
          <p>${pacientesDoDia[item].horario}</p>
        </div>
        <button class="btn">VISUALIZAR PRONTUÁRIO </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="currentColor" class="bi bi-three-dots-vertical icon-remover"
          data-id="${item}" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0
            1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg> `;

        show.appendChild(div);
      }
    })
})