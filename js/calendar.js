import { pacientesDoDia } from "./patients.js";
import { loadCompo, renderizarPacientes } from "./global.js"

// Faz a busca do paciente
document.addEventListener("DOMContentLoaded", ()=> {
  loadCompo('../components/aside.html', '.sidebar', ()=> {
    console.log(document.querySelector(".sidebar").innerHTML);
  })
});

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
        <button class="btn">VISUALIZAR CADASTRO </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="currentColor" class="bi bi-three-dots-vertical icon-remover"
          data-id="${item}" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0
            1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg> `;

        show.appendChild(div);
      }
    })
    document.querySelector(".btn").addEventListener('click', ()=> {
      window.location.href = "../pages/rapSheet.html";
    })
})

// Endereça para os pacientes do dia 
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.PacientesDiaConteiner')) {
    window.location.href = "../index.html";
  }
});