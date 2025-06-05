import { loadCompo } from "./global.js"

function calcularIdade(dataNascimentoStr) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimentoStr);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCompo('../components/aside.html', '.sidebar');

  const dadosPaciente = sessionStorage.getItem("pacienteSelecionado");
  if (!dadosPaciente) return;
 
  const paciente = JSON.parse(dadosPaciente);

  // Atualizar nome do paciente na interface
  const nomeElemento = document.getElementById("nome-paciente");
  if (nomeElemento) {
    nomeElemento.textContent = paciente.nome;
  }

  const idadeElemento = document.getElementById("idade-paciente");
  if (idadeElemento && paciente.data_nascimento) {
    const idade = calcularIdade(paciente.data_nascimento);
    idadeElemento.textContent = `idade: ${idade} anos`;
  }
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