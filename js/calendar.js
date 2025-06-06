import { loadCompo } from "./global.js"

// Faz a busca do paciente
document.addEventListener("DOMContentLoaded", () => {
  loadCompo('../components/aside.html', '.sidebar');
});

document.querySelector(".send").addEventListener('click', async (e) => {
  e.preventDefault();

  const id = document.querySelector(".inputPatient").value.trim();
  const show = document.querySelector(".showPatient");

  if (!id) return;

  try {
    const res = await fetch(`http://localhost:3000/pacientes/${id}`);
    
    if (!res.ok) {
      show.innerHTML = `<p style="color:red;">Paciente não encontrado</p>`;
      return;
    }

    const paciente = await res.json();

    const div = document.createElement('div');
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
          data-id="${paciente.id}" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 
            1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 
            1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 
            1.5 1.5 0 0 1 3 0"/>
        </svg>
      </div>
    `;

    show.innerHTML = ""; // limpa resultados anteriores
    show.appendChild(div);

    div.querySelector(".btn").addEventListener('click', () => {
      // Passa os dados via sessionStorage
      sessionStorage.setItem("pacienteSelecionado", JSON.stringify(paciente));
      window.location.href = "../pages/rapSheet.html";
    });

  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    show.innerHTML = `<p style="color:red;">Erro na requisição</p>`;
  }
});

// Endereça para os pacientes do dia 
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.PacientesDiaConteiner')) {
    window.location.href = "../index.html";
  }
});
